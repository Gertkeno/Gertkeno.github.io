---
pagetitle: Garrett Hale's Portfolio
author: Garrett Hale
css: ../document.css
---

A Catalog of My Story in Reverse Chronological Order
====================================================

Roblox Games
------------

Working at [Sandshark Games](https://www.sandsharkgames.com/) I programmed
games of various genres. I learned the bounty of lovely foot guns Roblox
has to offer. Stemming from the single threaded evented structure with
yielding calls, but it looks better than nodejs' call back mess.

- [Get Big](https://www.roblox.com/games/9379939316/)
- [Legends RP](https://www.roblox.com/games/9184480540/)

---

Go Godot Game Jam 2022
----------------------

First time using Godot I grouped up with a few of my friends to make a aim
training idle game. I like Godot's quick launch and broad feature set,

[Play Aim Trainer Idle Online!](https://hankik.itch.io/aim-trainer-idle)

<a href="https://hankik.itch.io/aim-trainer-idle">
![](https://img.itch.zone/aW1nLzkxMjI2NzkucG5n/315x250%23c/27JcXX.png "Aim
Trainer Idle Screenshot/cover image")
</a>

---

Zig - Crochet Helper - Wasm4
----------------------------

In my free time I crochet blankets, ponchos, and scarfs for my friends and
family. I prefer to make colorful flat images for these and I use to print out
an image, draw a grid and stitch marks over it. This took a lot of counting and
other work I would like done by computers. This was also a great excuse to use
[Zig](https://ziglang.org) a programming language I love!

[Crochet Helper Github.](https://github.com/Gertkeno/crochet_helper)

![](https://github.com/Gertkeno/crochet_helper/raw/master/sample.png "Crochet
helper screenshot")

[Zig](https://ziglang.org) has been wonderful to program personal games, and
integrates well with [wasm4](https://wasm4.org). Which I participated in the
wasm4 game jam and published to the core! My super cute girlfriend and I am
programming a multiplayer game with wasm4 which will make use of the new net
play feature!

[Play To The Core Online!](https://wasm4.org/play/to-the-core/)

<a href="https://wasm4.org/play/to-the-core/">
![](https://img.itch.zone/aW1hZ2UvMTM2NTIwMS83OTQ3MjY3LnBuZw==/347x500/2b0h1R.png "To The Core Screenshot")
</a>

---

RIFT
----

I added new features to a large code base, including working on UI. I worked
hand in hand with designers and had a great time! Gamigo held a game jam of
which I lead a team to create [Solario](https://solariogame.itch.io/solario).
As of writing this RIFT is in maintenance mode and will not be receiving
updates.

<a href="https://www.trionworlds.com/rift/en/">
![](https://cdn.akamai.steamstatic.com/steam/apps/39120/header.jpg?t=1610702571)</a>

---

Vessels
-------

I was the lead programmer on a team of six developers making Vessels, a narrative
focused puzzle/exploration game. I created a concise dialogue system for
designers to write and test in-game dialogue and story paths quickly.

I wrote a good amount on what tools we looked at, how I implemented this system
as a virtual machine, and what I believe are important design philosophies in my
blog post [Game Dialogue Systems](/dialogue-systems/). When making a scripting
language I knew we'd be throwing away valuable debugging tools, I made sure to
keep the scope low, strict, and loud with tests/warnings as we needed new
features

<video controls loop>
<source src="small_vessels.webm" type="video/webm">
</video>

---

Flappatron
----------

I made tools for automatic and manual lip syncing in Flappatron, a unique and
charming game. I reached out to the lead developer with recommendations on how
to solve the lip syncing time sink they were facing, but open source and
custom automatic solutions weren't capable of handling the wide variety of
characters and voices. We opted to speed up the manual syncing process with
custom tools.

[Steam Link](https://store.steampowered.com/app/1009750/Flappatron/)

<a href="https://store.steampowered.com/app/1009750/Flappatron/">
![](https://steamcdn-a.akamaihd.net/steam/apps/1009750/header.jpg?t=1588784337)</a>

---

Meme Game 2: 3D
---------------

I had an itch for diving in to OpenGL since I knew it would allow for 3D games
and more complex, fun rendering techniques. I started with a sequel to "Meme
Game" called ["Meme Game 2:
3D"](https://bitbucket.org/Gertkeno/meme-game-23d/downloads/). The game is a
boss-rush like *Star Fox 64* without the basic enemies, there is a mini-game
between bosses to collect power ups for later use. I wanted specific audio
features like looping music so I spent some time figuring out SDL2's bare bones
audio buffer system.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ZObwwNiPOq4?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

The following is a little trailer I made for "Meme Game 2", with less
debugging spheres and more thanking.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/p9rINCeBq4s?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

---

HTTPS Server
------------

I wrote an asynchronous HTTPS server in C++ using boost's ASIO library, to
prepare for Code2College teaching since I didn't have much web dev experience
before that. It should be live at [gerthouse.com](https://gerthouse.com/).

It's a link aggregate site hosted on a Raspberry Pi, my implementation takes
from [RFC7230](https://tools.ietf.org/html/rfc7230). Though I don't allow most
file manipulation functionality, instead sticking to what a browser would send.

I've since written another HTTP server in [Zig](https://ziglang.org/) a lovely
experimental language that comes with TCP networking in the standard library.

---

Meme Game
---------

My last 2D project before digging into 3D was ["Meme
Game"](https://bitbucket.org/Gertkeno/meme-game/downloads/) made for a specific
community, of which I even got some story and art help from! It's asteroid
controls doing boss fights, and the boss fights were fun to program. With their
help my focus was on programming and making the enemies unique.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/STzDAmqXj5c?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

This is the intended streamer playing the finished game.

<iframe src="https://www.youtube-nocookie.com/embed/Z1RxPUxIggQ?start=5925" width="560" height="315" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

---

Dad Slayer Six
--------------

This is a sample of ["Dad Slayer
Six"](https://bitbucket.org/Gertkeno/dadslayersix/downloads/) a
wave-based twin stick shooter with power ups and a turret thing. Later my friend
helped by doing audio, music, and some art. Coded in C++ with SDL2.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/0rdo_x2oDKE?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

---

Project Ant Farm
----------------

My first attempt at a proper 2D game is working-titled "Ant Farm". It's a idle
increment game using resource collection in such games as *Starcraft* or
*Age of Empires*. I argue it's still in development because I want to convert it
from 2D to 3D as a opportunity to study Vulkan.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/vvI1iAd-gqo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

---

Starfighter
-----------

I started game programming early on with this 2D Galaga-type game written in
Ruby. My father helped plenty and we gave a talk about it at a local Ruby on
Rails meet up! The code is over 10 years old and doesn't run without updating
gosu calls.

[Github Link](https://github.com/masonhale/Starfighter-Gosu-Tutorial)
