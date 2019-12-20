---
pagetitle: Airlock Dialogue System
author: Garrett Hale
---

AIRLOCK
=======

[AIRLOCK](https://github.com/gertkeno/airlock) is a story focused game I helped
create for the [HOFT Game Development Lab](https://www.gamedevelopmentlab.com/)
program as part of a team of 6 aspiring game developers with many growing skills.

Personally I did plenty of back end programming, and engineered a system in the
Unreal Engine for designers to easily add dialogue and functionality into the game.
The "Airlock Dialogue System" was used to package story data and functionality
together in a simple text file format.

The Airlock Dialogue System
===========================

AIRLOCK uses dialogue with branching paths, variables in and out of dialogue,
conditional statements, and cosmetic information about said dialogue.
As we were using Unreal Engine 4 we could've done dialogue in blueprints.
However, blueprint is a general purpose scripting language, it couldn't make
the same assumptions and simplify error checking like a custom dialogue
system could. We found that using blueprints for dialogue in such a talkative
game wasn't going to work, many errors we're hard to debug and the node graph
was an ever-growing pain to navigate.

Initially `.adf` text files the dialogue system read would contain data (text to show
on-screen) and choices leading to more data. This helped with branches in dialogue,
but this divided content creation heavily; dialogue written in `.adf` files were
invisibly acted upon by blueprint variables, and blueprints where haphazardly
reliant on `.adf` files being correct with little to no error checking possible.

Adding variables and conditionals to `.adf` files pushed a majority of blueprint's functionality onto the dialogue system.
This drastically improved our ability to produce and edit dialogue content.
I made sure to automatically check if variables were unused or unknown.
Blueprints were still used for resetting the scene and handling special triggers received from the dialogue system.

I was strongly against the initial implementation to separate variables from dialogue files.
A high-level system like this removes a lot of freedom from developers; I was transparent about that.
The design team thought they would need that freedom more than they would benefit.
Instead of arguing the benefits I pressed that the extra freedom wasn't needed; in the end I made the blueprint-oriented system and it was a mess.
We did learn more about what features we would and wouldn't be using, when back at the drawing board we honed in that ratio of freedom to ease of use.

I'd argue legibility's importance would be aided in this system, but much of our group was not comfortable writing plain text documents.
I believe the `.adf` files are easier to read than a pure blueprint system as linear text does not apply in 2D node-graph space.
Though the functionality within these files gets difficult to track, I tried to create rules and warnings to aid.
Such as forcing per-file scoping unless explicitly disabled; variables are guaranteed to be set and used within a file, controlling sprawling dependency lists.

File Structure
==============

Airlock Dialogue files follow a line-based format, initially based on markdown.

Dialogue is broken up into "Pages", basically start points for sections of text.
We reference these pages in the text files for player choice results, and functionally linked dialogue.
When dialogue is started through in-game interactions we specify a page name to start.

Every line of dialogue can optionally have functions following it.
These functions operate when the line of dialogue is said in-game.

We send some data to UE4 Blueprints, all variables set in text files are accessible and mutable.
Most dialogue related blueprints is executed with the hook "on exchange end".
Usually blueprints just use dialogue to trigger a stage-reset when the player dies through dialogue.

Data Structure
==============

Our system structures every non-blank line in a linked list, some are dialogue, some functions.
Reading through this linked list is a lot like reading null-terminated cstrings.
The system knows to stop and display text if the next node is of type `SAID_TEXT` or `nullptr`.

```cpp
// Structure for each line in text file

struct Line
{
	FString function_input;
	enum function_t
	{
		// Shortened list of function types
		SAID_TEXT,
		CHOICE_TEXT,
		NAME,

		CONDITIONAL,
		SET,
		UNSET,

		LINK_TO,
	} function;

	Line *next;
};
```

```bash
SAID_TEXT, "I've Been expecting you" --> NAME, "Rakesh" --> SAID_TEXT, "Please share your report" --> LINK_TO, "AsEsme_Choices" --> nullptr
```

In this example "I've been expecting you" will be displayed and the current talking character is set to Rakesh.
The player advances and "Please share your report" is displayed, the next page `#AsEsme_Choices` is queued.
Again the player advances and the queued page is loaded and read the same way.
If a page isn't queued then dialogue ends.
The last page loaded is sent to UE4 blueprints and special functions may apply.

Here's the file version of the example.
The page's name is `Start_AsEsme`

```markdown
# Start_AsEsme

I've been expecting you.
	~name: Rakesh
Please share your report.
	~linkto: AsEsme_Choices
```

Pages, or linked list heads are stored in a `TMap <FString, Line *>`, a hash table, so we can effectively use strings in a key, value pair.

