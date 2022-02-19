---
pagetitle: Teaching with Zig
author: Garrett Hale
date: Fri Mar 26 02:19:54 PM CDT 2021
css: ../document.css
---

Teaching with Zig
=================

I started teaching my cute girlfriend how to program in zig. With zig I feel
it's consistent, usually looks beautiful, and it's focus on ease of reading over
writing helps with learning for veterans and newcomers alike.

A lot of under the hood magic does more harm than good, curious minds ask why
things happen not just how, and it typically benefits them to know. Worse yet if
magic does break they now _need_ to know why and the magic is now something to
watch for! For example implicit casts always trip up newcomers, it's something
all of us learned to deal with, and for every language it's a new book of hidden
rules from C to Javascript.

Zig helps by forcing more explicit code and having consistent, lean syntax.
Picking on C++, there are so many ways to initialize a variable, and it's so
rare to use even half of them.

![initialize meme haha](https://i.imgur.com/3wlxtI0.mp4)

In teaching I've found that the most trouble is caused by what is allowed by a
language, but absolutely not what the student wants to do. It's a large part of
simply learning the syntax.

```c
#include <stdio.h>

void helloWorld() {
	printf("Hello World!\n");
}

int main() {
	helloWorld;

	return 0;
}
```

A simple syntactic mistake, forgetting parenthesis, yet this compiles and does
nothing. It looks correct, at least close to correct! Luckily `-Wall` will catch
this and it _should_ be standard practice to make with `-Wall -Wextra`.

What is Zig?
============

Zig sets out to learn from the nearly 50 years of C development, making already
standard patterns easier to read and write. With low cost error checking, slices
bundling pointer and length, defer/errdefer to ensure allocations are paired
with deallocations in a semi RAII fashion, and more! A big selling point is
safety, with some dogma Zig benefits by making it more difficult to accidentally
mess up; you're working with the language as it catches slip ups.

This might sound a lot like Rust's pitch so far but I feel Zig is much closer to
C's style and uses less special characters and glyphs, making it feel more like
English. Safety checks can be turned off for release builds, but still help
tremendously in debug and even optimized 'release-safe' mode. Personally I have
not had to use gdb or valgrind for my games in written in Zig.

Simple Declarations
-------------------

Starting off Zig uses a variant of pascal's variable definition `name: type =
value;` this makes pointers, const, and function pointers so much easier to deal
with. Using function pointers in C/C++ I've always had to look up how exactly to
write it especially with variations for typedefs and C++'s `using =`, in Zig I
just guessed correctly the first time; purely intuition.

The old adage for C is
["The Spiral Rule"](http://c-faq.com/decl/spiral.anderson.html) to not read from
left to right but wrapping around in a clockwise circle, sometimes? I'll post
the examples from this side by side.

*c*

```c
1 char *str[10];
2 char *(*fp)(int, float *);
3 void (*signal(int, void (*fp)(int)))(int);
```

*zig*

```rs
1 var str: [10]*u8;
2 var fp: fn(i32, *f32) *u8;
3 var signal: fn(i32, fn(i32) void)) fn(i32) void;
```

You can read every declaration left to right, no Uzumaki ramblings about
spirals. That last one is still a mess but at least it's apparent it's a
function pointer which takes a number and a function pointer, and returns a
function pointer.

Quick Compile and Run
---------------------

Tackling syntax and structure is hard enough, adding a esoteric build system and
config files on top is a mess; especially for students staring to get into it
and trying to show off to friends. `zig build-exe file.zig` by default has no
dependencies, you can ship executables to people and it will just work!
`zig run file.zig` behaves like and interpreted languages, by compiling and
immediately running the program. Both of these aren't proper build system, which
is where build.zig comes in, why learn a new language to build your zig files?
Zig houses it's own build system.

Error Handling
--------------

Zig normalizes error handling, it is truly easy to write code that handles edge
cases. In debug/safe builds Zig gives a wonderful trace if an error reaches all
the way up main. Functions are required to state if they can fail with a simple
`!`. It's impressive how easy error handling is in Zig, while in any try-block
language thrown errors provide less, promote handling multiple errors as one,
and make it painful to declare user-defined errors.

In combination with `errdefer` cleaning up in failure conditions is easy too,
C would require rewriting free statements after every failure check and
cascading indents if you cannot early `return;` or `exit(0);` in the function.

More Resources
==============

[Ziglearn.org](https://ziglearn.org/chapter-1/) does a fantastic and up to date
job going over features in zig and even some of the standard library!

[Ziglings](https://github.com/ratfactor/ziglings) is a tutorial in the form of
fixing broken zig code. This tutorial goes over basic programming fundamentals,
and zig specific functionality, like slices and optional types.

As a new and experimental language core stuff changes frequently so it's hard to
write tutorials at the moment.
