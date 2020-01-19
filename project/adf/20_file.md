File Structure
==============

Airlock Dialogue files follow a line-based format, initially based on markdown.

Dialogue is broken up into "Pages", basically start points for sections of text.
We reference these pages in the text files for player choice results, and functionally linked dialogue.
When dialogue is started through in-game interactions we specify a page name to start.

Every line of dialogue can optionally have functions following it,
these functions operate when the line of dialogue is said in-game.
For cosmetic functions, like declaring who is speaking, this format can be confusing;
multiple lines said by the same person can be written like so:

```markdown
# Your behavior

Gates... it seems you're beginning to recover your memory.
	~name: Rakesh
That's good. Now... in accordance with LSSC policy:
What was our mission when we left the Hephaestus station?
	~complete: nowrakesh
	~quest: testmission_DISCOVER THE MISSION
```

Without some helpful line breaks this made long, multi-cast pages annoying to read.

UE4 Integration
---------------

So we have our dialogue, but how does this fit in Unreal?
Characters and interactive objects have a component which reads a specified `.adf` text file.
This helps split the dialogue into per-character chunks, which usually falls inline with our gameplay.
Chapter one is the worst example of this as the player is interacting with three characters at once,
interactive objects such as the reactor are great for this one-on-one conversing format.

The dialogue component also exposes triggers and variables from text to blueprints.
