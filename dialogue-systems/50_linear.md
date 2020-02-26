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

Tracking quest state can be done purely by a integer value; keeping a boolean
for if the quest is finished can be advantageous, but you can typically get away
with a sentinel finish value. Say if a quest state is above or equal to 100 it
is finished, this gives you 100 beats for the quest to hit before getting into
fail/success states. Morrowind followed this ideology closely, and like BASIC
most quests would increment state by 10 to allow for easy dialogue insertion.

```cpp
// quest.hpp
class Quest
{
	int state;

	const std::string name;
public:
	Quest (const std::string & questName)
		: name (questName), state (0)
	{
	}

	std::string get_name() const {return name;}
	bool is_complete() const {return state >= 100;}
	int get_state() const {return state;}

	bool update_state (int newState)
	{
		if (newState <= state)
			return false;

		state = newState;
		return true;
	}
};
```

Integrating this nicely can be difficult, I'm going to assume a more hard-coded
approach which is unlike Morrowind and their creation kit. Creating a file for
quest specific dialogue can prove useful even if state updates are compiled in
the game. Morrowind uses a quick question and answer dialogue format, one input
and one output. Most of this file structure is pairing a block of NPC text to a
topic. A topic may only contain one block of text, where a quest has state and
responds differently.

Under construction! :^)

<!-- vim: set cc=80: -->
<!-- vim: set spell: -->
