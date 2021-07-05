Conclusion
==========

When designing a system it's of utmost importance to consider the following:

1. Error Checking
1. Legibility
1. Expandability

While programming in general the ability to debug code should be in the back of
your head. While designers are using your system it should be a forced, implicit
part of the system. At any point stop and think "How could this function be
misused?", "What if this is misspelled?" and try to flag that case. Your system
should check designer's code vigorously.

Writing your own language puts you in a unique situation of having to teach it.
Do yourself a favor and make it simple and transparent, use as much English as
possible. "Syntactic sugar" should be avoided, too many enigmatic percent signs
and asterisks only cause confusion and a trip to the manual, even for yourself.
I'd recommend making use of braces or parenthesis if applicable, white space can
be difficult to debug and program for.

More functionality will always be around the corner, be ready to quickly try out
ideas. Make sure you can account for functions with multiple parameters. Add an
escape character in case your special characters are needed in-dialogue.

Creating a virtual machine can be all the fun of making your own language without
all the hassle of compiler architecture. Good luck, try to make the most of it!
