Morrowind and Linear Quests
===========================

My implementation examples will be based on
[OpenMW](https://github.com/OpenMW/openmw), a fan re-write of Bethesda's engine.
Most examples being specifically from the [mwdialogue](https://github.com/OpenMW/openmw/tree/master/apps/openmw/mwdialogue)
source folder. OpenMW houses very legible code, I'd recommend digging around
if you feel inclined.

Morrowind's quests are often talking to some mook, going somewhere, killing a
thing, getting an item, and reporting back. This structure can often be completed
out of order, getting quest item then talking to quest giver usually results in
immediately turning in the quest. This is all part of a very reactive dialogue
system rather than a world reacting to quest state.

There's a handful of assumptions Morrowind holds about itself that is leveraged
well in it's dialogue system. There is only one player in Morrowind, this is
something game engines typically have a hard time catering to and can make data
storage a pain. Quests are linear, one way trips, it's a fact that you cannot
regress in quest completion; though we'll dig into multiple endings and fail
states later.

<!-- vim: set cc=80: -->
<!-- vim: set spell: -->
