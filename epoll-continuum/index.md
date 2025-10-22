---
pagetitle: Epoll in Continuum
author: Garrett Hale
date: Tue Oct 21 02:35:23 PM CDT 2025
css: ../document.css
---

# Texas Game Jam

This article summarizes my experience learning non-blocking network I/O with
linux's [epoll][epoll.7] and Zig 0.15. I started this project for [Texas Game
Jam][TXGJ25], with "Out of Time" as the theme I wanted to make a decaying game,
where some players would find the world changing without full real-time
multiplayer. As usual I want to feature playable in-browser games, this brought
more complications that I *should've* known, and drove me to use OpenSSL through
zig's c translation layer, epoll, and implementing a WebSocket server.

For Texas Game Jam I signed up as a mentor and judge, for fairness this began
my first solo-jam! I opted for a simple game premise I know Godot can handle
without any problems and used one of 4.5's new tile map performance features.
The main gameplay focused on a simple castlevania-esq platformer using two
tile sets I know well, [Jetrel's castle platformer][twilight tiles] and
[chipmunk's hostile planet][hostile tiles]. With a basic character controller I
started work on the bulk of this project, the server.

# First Continuum Server

The game plan was to use HTTP requests that result in atomic server operations,
thinking this may double as a easy website for fun statistics or to see the
online players count. I wanted to use [Zig 0.15's new io interface][zig15], but
made use of fixed readers at best, support for these non-blocking systems lacks.

I started by using poll at first, requiring management of a pollfd object for
every connection, and a separate pollfd for accepting new connections. A quirk
epoll solves by keeping the poll objects inside a system object for repeat use
on each `epoll_wait` call.

```zig
fn handleConnections(allocator: std.mem.Allocator, players: []Player, game_state: *GameState) !bool {
    var read_new: bool = false;

    // creating and managing pollfd objects for each connection every read...
    const pollfds = try allocator.alloc(std.posix.pollfd, players.len);
    for (players, pollfds) |player, *pollfd| {
        pollfd.* = std.posix.pollfd{
            .fd = player.connection.stream.handle,
            .events = std.posix.POLL.IN,
            .revents = 0,
        };
    }

    // returns false if nothing of note was read
    const read_fds = try std.posix.poll(pollfds, 10);
    if (read_fds == 0) {
        return false;
    } else if (read_fds < 0) {
        std.log.err("read fds error! {}", .{std.posix.errno(read_fds)});
        return false;
    }

    // poll returns how many fds responded, but one must check all fds as the
    // results are not ordered. At best an early break can be implemented.
    for (players, pollfds) |*player, pollfd| {
        if ((pollfd.revents & std.posix.POLL.IN) != 0) {
            const fail_mask = std.posix.POLL.HUP | std.posix.POLL.NVAL | std.posix.POLL.ERR;
            if ((pollfd.revents & fail_mask) != 0) {
                // close stream later
                player.dropped_connection = true;
                continue;
            }
// ...
```

I found HTTP might take too much time over using the TCP sockets directly,
Godot reads and writes to a StreamPeerTCP similarly to Zig, taking and putting
integers as need.

Testing in debug this direct TCP worked flawlessly. Over the wire with some
delay, it showed Godot blocking waiting for TCP responses, not great but I ended
up with this for the jam. The worst part, web browsers forbid direct TCP
sockets, at best websockets or the original HTTP server would need implementing.
I could not publish a play in browser version of the game for the jam.


# Now with Websockets.zig!

I could add play-in-browser via reformatting my Clients to use HTTP requests or
try out WebSockets. WebSockets promise of a raw-socket-like interface drew me in
and a new interface to learn.

In an attempt to speed this business up I opted for a library [websocket.zig].
It uses zig's robust comptime to effortlessly create a server around your own
defined struct, so long as it has a handshake and check message function. More
build system practice with zig, but not a unique learning opportunity. The
websocket implementation obscured to me, I didn't learn much of it, but I
perused [MDN's page on Writing WebSocket Servers][mdn-wws].

Testing locally, and this time in-browser, web sockets worked! A little
refactoring on Godot's side ultimately allowed for non-blocking gameplay too.
I uploaded this build again to itch, to my dismay, a dark force forbade it.


# Throwing it all out for Security

Firefox promotes websockets to secure websockets if the connection uses HTTPS.
Itch.io uses HTTPS, so I must upgrade my websockets. [websocket.zig], however
does not support TLS servers. Maybe they expect nginx to handle securing the
connections but I prefer less intermediaries.

Now, after dismissing my initial poll implementation, I will have to implement
OpenSSL and WebSockets on top. If I hadn't already tackled poll and made the
game public I would've given up. A lot to chew on and I've already spent a
weekend on the project.

Starting again I also wanted to upgrading the non-blocking I/O. In using poll I
saw epoll brought up often as an improvement, and I knew of IOUring from others
talk.


# Weighing Syscalls

I've heard IOUring made a splash years back, the pitch made sense; ring buffer
IO operations for concurrent scheduling. As I looked more into using it more and
more forum posts brought up the identical syscall usage compared to poll or
select, at least for naive usage. Oh my vanity for micro-performance
optimizations in my personal projects, and I didn't like how poll left me to
handle pollfds growing and shrinking with connections, I looked over IOUring for
epoll. I think this proved the right choice, but I hold excitement for IOUring
in the future.

Using [Karl Seguin's zig TCP tutorial][zig epoll] I effortlessly setup epoll,
love having a user data pointer to manage my objects. That specific page of the
tutorial contained all I needed to blast off! I created container objects to
smooth out syscalls and translated c in zig.

```zig
const local = try std.net.Address.resolveIp("127.0.0.1", 33322);
var server = try local.listen(.{
    .reuse_address = true,
    .force_nonblocking = true,
});
defer server.deinit();

// allocates epoll_events and calls epoll_create1
var epoll = try EPoll.init(allocator);
defer epoll.deinit();

var clientPool = std.heap.MemoryPool(Client).init(allocator);
defer clientPool.deinit();
try clientPool.preheat(4);

// adds an IN event via epoll_ctl, ptr value of 0
try epoll.addListener(server.stream.handle, 0);

while (running) {
    // a '[]const std.linux.epoll_event' slice, sometimes zero events
    for (epoll.waitEvents()) |event| {
        switch (event.data.ptr) {
            0 => { // listener, accept new fd
                const new_client_fd = try std.posix.accept(server.stream.handle, null, null, std.posix.SOCK.NONBLOCK);
                std.log.debug("{d}> new connection", .{new_client_fd});

                const new_client_ptr: *Client = try clientPool.create();
                errdefer clientPool.destroy(new_client_ptr);

                new_client_ptr.* = Client{
                    .fd = new_client_fd,
                };

                // adds an IN/OUT event via epoll_ctl with ptr casting the client object
                try epoll.addSocket(new_client_fd, new_client_ptr);
            },
            else => |nptr| {
                // just trying to see if epoll works, will add proper event
                // checking later, along with SSL and WebSockets
                var client: *Client = @ptrFromInt(nptr);
                if (client.getWriteableBytes() > 1) {
                    const read_bytes: []const u8 = try client.read();

                    std.log.debug("{d}> Read {d} bytes aka '{any}'", .{ client.fd, read_bytes.len, read_bytes });
                }

                if (client.closed) {
                    try epoll.dropSocket(client.fd);
                    client.deinit();
                    clientPool.destroy(client);
                }
            },
        }
    }
} // while running
```


# Security is easy?

OpenSSL boasts ever better documentation, [their guide on a blocking server][openssl sb]
helped me get started, I worried the partial reads of a non-blocking server
breaks SSL handshakes and reads, but the context and ssl objects handle by
errors with "want read" or "want write" in such cases, one responds by calling
the handshake or read function again.

Confirming everything works with `openssl s_client -crlf -connect localhost:33322`,
but testing in-browser doesn't appreciate my self-signed certificates, my server
does have a certificate backed by LetsEncrypt, so I press on and sweat on the
possibility this still doesn't work once fully published.

The main.zig doesn't change much, I shoved most of the server setup into
`SSLCTX.init`. SSL objects can operate on file descriptors directly, including
when set non-blocking, despite what others may say online an intermediate mem
bio is not required but may help for buffering partial reads.


# WebSockets

Ironically web sockets start with a wee bit of HTTP. In the "Handshake", the
client must present a web socket version and challenge key through headers
"Sec-WebSocket-Version" and "Sec-WebSocket-Key". The challenge follows by
appending the key and a magic string
"258EAFA5-E914-47DA-95CA-C5AB0DC85B11" hashing the result, encoding in base64,
and sent back in a HTTP response, thus websocketing begins. It feels important
but we throw away the key and handshake, not a secure transaction, the challenge
serves to prevent a server/client from entering an accidental websocket
transaction.

```zig
const encoder = std.base64.standard.Encoder;
const len = comptime encoder.calcSize(20);
var key64 = std.mem.zeroes([len]u8); // storage for compelted challenge

// if header == Sec-WebSocket-Key ...
    const key_len = comptime encoder.calcSize(16);
    if (value.len != key_len) {
        return failHandshake("Invalid key length", writer);
    }

    var with_magic: [key_len + MAGIC_V13.len]u8 = undefined;
    std.mem.copyForwards(u8, with_magic[0..key_len], value);
    std.mem.copyForwards(u8, with_magic[key_len..], MAGIC_V13);

    const sha1d: [20]u8 = sha1(&with_magic);
    _ = encoder.encode(&key64, &sha1d);
// done with headers ...

// missing Sec-WebSocket-Key
if (key64[0] == 0) {
    return failHandshake("No key", writer);
} else {
    try writer.writeAll("HTTP/1.1 101 Switching Protocols\r\n");
    try writer.writeAll("Connection: Upgrade\r\n");
    try writer.writeAll("Upgrade: websocket\r\n");
    return writer.print(
        "Sec-WebSocket-Accept: {s}\r\n\r\n",
        .{key64},
    );
}

```

WebSocket packets lead with a 2 byte frame, up to an optional 8 byte length,
clients must send a 4 byte mask. I use zig's packed structs for the web socket
frame, a great candidate for the feature but somehow I end up byte-swapping the
fields, zig has tools for converting endian-ness such as @byteSwap or
std.mem.toNative I can't remember why they didn't work for me. With default
values for sending packets, needing to set the payload length before following
writes with the binary data.

```zig
const WSHead = packed struct(u16) {
    payload_len: u7,
    mask: bool = false,
    //
    op: WSOpcode = .binary,
    reserved: u3 = 0,
    fin: bool = true,
};
```

The "mask" also appears to further confirm the client and server acknowledge the
websocket protocol. Each client packet must include a u64 mask to xor'd over the
entire payload. WebSocket does not require the server to mask payloads, so I do
not :)

```zig
const mask_bytes = std.mem.asBytes(&mask);
const payload = reader.take(total_len) catch unreachable;

for (payload, 0..) |*p, i| {
    p.* ^= mask_bytes[i % 4];
}
```

Now I can process the payload as I did when using TCP directly.

# Oops! All Protocols

With SSL and epoll setup I feel empowered to write more protocols. I add a
[gemini] server and HTTP redirector. Each of these modules needs a "check"
function to determine when a valid message comes in, and how long that message
measures. Then a "parse" function to consume the message. For example HTTP
checks for double CRLF, where headers end, and use any found "Content-Length"
header for the body length. Web socket checks for at least two bytes (the
frame), then reads the frame's payload length. If found, "parse" receives the
message and acts on it. And [gemini] looks for a single ending CRLF.

To epoll each new server/protocol appears as just another file descriptor. I add
a special value for stdin, so I can add commands such as 'quit' to close the
server or game functions like resetting the world.

```zig
var modules = [_]Module{
    .{
        .port = 33322,
        .check = Module.WebSocket.check,
        .parse = Module.WebSocket.parse,
    },
    .{
        .port = 8080, // 80?
        .using_ssl = false,
        .check = Module.HTTPRedir.check,
        .parse = Module.HTTPRedir.parse,
    },
    .{
        .port = 1965,
        .check = Module.GemCapsule.check,
        .parse = Module.GemCapsule.parse,
    },
};
// ...

while (running) {
    for (epoll.waitEvents()) |event| {
        if (event.data.ptr == 0) { // stdin, read *should* be full lines
            const read_count = try posix.read(posix.STDIN_FILENO, stdin_buffer);
            const seg = std.mem.trim(u8, stdin_buffer[0..read_count], &std.ascii.whitespace);
            if (std.mem.eql(u8, seg, "quit")) {
                running = false;
                try stdout.writeAll("Closing server...\n");
            }
        } else if (event.data.ptr < modules.len + 1) { // listener modules, offset by 1; stdin on ptr 0
            const module = modules[event.data.ptr - 1];

            if (posix.accept(module.socket, null, null, posix.SOCK.NONBLOCK)) |new_client_fd| {
                const ssl: ?SSL.Connection = if (module.using_ssl) try ctx.newConnection() else null;
                if (ssl) |sl| {
                    sl.setFD(new_client_fd) catch |err| {
                        std.log.warn("setFD error '{t}', closing fd#{d}", .{ err, new_client_fd });
                        posix.close(new_client_fd);
                        continue;
                    };
                }

                // new connection!
                const new_client_object: *Client = try client_pool.create();
                errdefer client_pool.destroy(new_client_object);

                new_client_object.* = Client.init(
                    ssl,
                    new_client_fd,
                    &game_state,
                    allocator,

                    module.check,
                    module.parse,
                );

                try epoll.addSocket(new_client_fd, new_client_object);
            } else |err| {
                std.log.err("Socket accept error '{t}'", .{err});
                return err;
            }
        } else { // clients
            const client: *Client = @ptrFromInt(event.data.ptr);
            // ...
```


[twilight tiles]: https://opengameart.org/content/castle-platformer "OpengameArt.org: Castle Platformer"
[hostile tiles]: https://opengameart.org/content/hostile-planet "OpengameArt.org: Hostile Planet"
[epoll.7]: https://www.man7.org/linux/man-pages/man7/epoll.7.html "man epoll.7"
[TXGJ25]: https://itch.io/jam/texas-game-jam-2025 "Itch.io: TXGJ 20205"
[zig15]: https://ziglang.org/download/0.15.1/release-notes.html#Writergate "Zig 0.15.1 Writergate"

[openssl sb]: https://docs.openssl.org/master/man7/ossl-guide-tls-server-block/ "OpenSSL Docs: Blocking TLS server"
[zig epoll]: https://www.openmymind.net/TCP-Server-In-Zig-Part-6-Epoll/ "TCP Server In Zig: Epoll"
[websocket.zig]: https://github.com/karlseguin/websocket.zig "Github: websocket.zig"
[mdn-wws]: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers "MDN: Writing WebSocket Servers"
[gemini]: https://geminiprotocol.net/docs/ "Gemini Protocol Docs"
