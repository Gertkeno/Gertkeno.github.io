# Airlock

[AIRLOCK](https://github.com/gertkeno/airlock) is a story focused game I helped
create for the [HOFT Game Development Lab](https://www.gamedevelopmentlab.com/)
program as part of a team of 6 aspiring game developers with many growing skills.

Personally I did plenty of back end programming, and engineered a system in the
Unreal Engine for designers to easily add dialogue and functionality into the game.
The "Airlock Dialogue System" was used to package story data and functionality
together in a simple text file format.

# The Airlock Dialogue System

## Story Overview

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

Adding variables and conditionals to `.adf` files pushed a good amount of the
remaining blueprint functionality onto the dialogue system. Oddly, UE4 blueprints
didn't check if variables were unused; I made sure to automatically check if
variables were unused or unknown. Blueprints were still used for resetting the
scene and handling special triggers received from the dialogue system.

## File Structure

Airlock Dialogue files follow a line-based mutation of markdown.
