Vessels and Virtual Machines
============================

Vessels originally planned for a open world approach. The tool
[*ink*](https://www.inklestudios.com/ink/) seemed promising, but didn't fit our
proposed design requirements. Looking at it now we seem to have implemented
most of *ink*'s features and architecture with more legible syntax, if it
worked with Unreal and I dug deeper I'm sure we would've picked this tool.
[*Twinery*](https://twinery.org/) is another tool we would use for our initial
draft. *Twinery* doesn't export to a easy to parse format, nor work out of the
box with Unreal, it was useful to find out what features we would need.

I didn't look into [*Rumor*](https://github.com/exodrifter/unity-rumor) at the
time, but it's a fruitful dialogue system with fantastic, simple syntax.

The benefit of a virtual machine like *ink* or the "Airlock Dialogue File"
(*ADF*) is allowing designers immense control over pathways and state changes.
It's important to only cater to those two objectives, too many features can bog
down your dialogue systems ease of use or overcomplicate simple functions.
*ADF* for example only stores boolean flags, no integers or math allowed.

When restraining scope and curbing potential downsides virtual machines
flourish, *ADF* handles 6,923 lines of dialogue with 7,258 written operators
for flow control.  This would've been over 7,258 nodes in blueprint without
this system to ease reading and writing; not to mention cut out Unreal's
atrocious boot time.

<!-- vim: set cc=80: -->
<!-- vim: set spell: -->
