---
pagetitle: Zig is cool
author: Garrett Hale
date: Fri Mar 26 02:19:54 PM CDT 2021
css: ../document.css
---

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
2 char *(*fp)( int, float *);
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
