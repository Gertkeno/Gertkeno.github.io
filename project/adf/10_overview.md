---
pagetitle: Airlock Dialogue System
author: Garrett Hale
---

TITLE TBD
=======

[TITLE TBD](https://github.com/gertkeno/airlock) is a story focused game I helped create for the
[HOFT Game Development Lab](https://www.gamedevelopmentlab.com/) as part of a team of 6 fantastic game developers.
The project name was Airlock while in-development.

Personally I did plenty of back end programming, and engineered a system in the
Unreal Engine for designers to easily add dialogue and functionality into the game.
The "Airlock Dialogue System" was used to package story data and functionality
together in a simple text file format.

The Airlock Dialogue System
===========================

TITLE TBD uses dialogue with branching paths, variables in and out of dialogue,
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
Blueprints could still be used for resetting the scene and handling triggers received from the dialogue system.

I was strongly against the initial implementation to separate variables from dialogue files.
A high-level system like this removes a lot of freedom from developers; I was transparent about that.
The design team thought they would need that freedom more than they would benefit.
Instead of arguing the benefits I pressed that the extra freedom wasn't needed; in the end I made the blueprint-oriented system and it was a mess.
We did learn more about what features we would and wouldn't be using, when back at the drawing board we honed in that ratio of freedom to ease of use.

I'd argue legibility's importance would be aided in this system, but much of our group was not comfortable writing plain text documents.
A node-graph editor like [Twinery](https://twinery.org/) certainly helps with organizing/linking text, I would've liked to make a node-viewer tool if time permitted.
Functionality within these files gets difficult to track, so I created plenty of warnings to aid.
Such as per-file scoping; variables are guaranteed to be set and used within a file, controlling prawling dependency lists.
