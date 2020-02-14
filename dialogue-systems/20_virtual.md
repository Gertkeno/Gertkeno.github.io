Vessels and Virtual Machines
============================

Vessels originally planned for a open world approach. The tool
[*ink*](https://www.inklestudios.com/ink/) seemed promising, but didn't fit our
proposed design requirements. Looking at it now we seem to have implemented
most of *ink*'s features and architecture with more legible syntax, if it
worked with Unreal and I dug deeper I'm sure we would've picked this tool.
[*Twinery*](https://twinery.org/) is another tool we would use for our initial
draft. *Twinery* doesn't export to a easy to parse format, nor work out of the
box with Unreal, it was useful to map out what features we would need.

The benefit of a virtual machine like *ink* or the "Airlock Dialogue File"
(*ADF*) is allowing designers control over such immense pathways and state
changes. Typically if a third party is distributing their dialogue system it'll
be some sort of virtual machine, reason being that virtual machines can cover
a lot of functionality. When marketing a system like this it sells to boast a
large feature list and appeal to every possible edge case, this can be costly
for designers as you end up working with some unpopular, esoteric, or illegible
programming language like Rust.

When restraining scope and curbing these potential downsides virtual machines
flourish, *ADF* handles 4,948 lines of dialogue with 5,699 written operators
for flow control.  This would've been over 5,699 nodes in blueprint without
this system to ease reading and writing; not to mention cut out Unreal's
atrocious boot time.

<!-- vim: set cc=80: -->
<!-- vim: set spell: -->
