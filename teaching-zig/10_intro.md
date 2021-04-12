---
pagetitle: Teaching with Zig
author: Garrett Hale
date: Fri Mar 26 02:19:54 PM CDT 2021
css: ../document.css
---

Teaching with Zig
=================

I started teaching my cute girlfriend programming, previously I've taught my
friends and students with hurdles and some of that is certainly my fault. I
found that syntax is simply difficult in many languages beginners want to learn.
A lot of under the hood magic typically did more harm than good, curious minds
ask why thing happen not just how, and it typically benefits them to know. Worse
yet if magic messes up they now *need* to know why and the magic is instead a
edge case to trip over.

People don't think of C/C++ as having a lot of magic, it doesn't compared to
Python or Ruby. Implicit casting however does a good job tripping up new
programmers, the classic case being diving integers with floats.

zig helps teach programming ramble ramble here

What is Zig?
============

Zig sets out to learn from the nearly 50 years of C development, making already
standard patterns easier to write and read. With low cost error checking via
under the hood unions, slices for bundling pointer and length, defer/errdefer
to ensure allocations are paired with deallocations in a semi RAII fashion, and
more! A big selling point is safety, with some dogma Zig benefits by making it
more difficult to accidentally mess up; you're working with the language as it
catches slip ups.

This might sound a lot like Rust's pitch so far but I feel Zig is much closer to
C's style and it's easy to feel at home with most deviations. Zig is often more
helpful with less features (as designed). For example my introduction to Rust
included variable shadowing in the spotlight as a way to deal with the immense
const correctness. Shadowing is a feature that made it into [Facebook's
curiously recurring bugs](https://youtu.be/lkgszkPnV8g).  Furthermore if you
watch through that cppcon talk you'll find that nearly every bug talked about is
mitigated in Zig.

What I Like
===========

Simple Declarations
-------------------

Starting off Zig uses a variant of pascal's variable definition `name: type =
value;` this makes pointers, const, and function pointers so much easier to deal
with. Using function pointers in C/C++ I've always had to look up how exactly to
write it especially with variations for typedefs and C++'s `using =`, in Zig I
just guessed the first time correctly; purely intuition.

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

That last one is still a mess but at least it's apparent it's a function pointer
which returns a function pointer. Furthermore you can read every declaration
left to right, no Uzumaki ramblings about spirals.

Error Handling
--------------

Zig normalizes error handling, it is truly easy to write code that handles edge
cases. In debug/safe builds Zig gives a wonderful trace if an error reaches all
the way past main. Functions are required to state if they can fail with a
simple `!` and the compiler will figure out how it can fail based on thrown
values. The "how it can fail" part is important for switching on error values
with 100% certainty that all cases are covered. It's impressive how easy error
handling is in Zig, while in any try-block language thrown errors provide less
and less information based on how far they are from the throw, promote handling
multiple errors as one, and make it painful to declare user-defined errors.

In combination with `errdefer` cleaning up in failure conditions is easy too,
C would require rewriting free statements after every failure check and
cascading indents if you cannot early `return;` or `exit(0);` in the function.
