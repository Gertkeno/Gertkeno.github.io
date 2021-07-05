---
pagetitle: Game Dialogue Systems
author: Garrett Hale
css: ../document.css
---

Systems Intent
==============

Dialogue can be the focus of many games, if robust dialogue is the foremost
feature then it's important to create or use a system that can account for the
plethora of data and logistics behind simple game dialogue.

Some games, like Morrowind use dialogue for linear quest interactions, and
Morrowind houses a healthy amount of quests. In this scenario the game needs
to track multiple quest progressions, though that's the end of it, linear state.
[OpenMW](https://openmw.org/en/), a fan re-write of the Morrowind engine has
fairly legible quest code available
[here](https://github.com/OpenMW/openmw/tree/master/apps/openmw/mwdialogue).

Telltale's "The Walking Dead" uses a branching paths story in a hierarchic
structure, one choice always leads to a new choice, never repeating.
The hierarchy inherently provides structure used to create branches
and reduce branches back into a linear path.

Our team's game "Vessels", we had a finite cast of characters and a spider-web
of dialogue for the player to unravel. We used [Twinery](https://twinery.org/)
to draft our story as the node-based system and robust state machine handles
our cyclical, evolving story. In Unreal we developed our own virtual machine
to handle dialogue, sewing programming and dialogue into one text file.
With a virtual machine like this we could create branching paths and out of
order execution for player progression.

When designing any system it's important to only pay for what you use.
Having a firmly low scope means saying no to some requests, it means
building a system that simply can't do everything. By design the limitations
can bring benefits, you can make assumptions of what designers are trying to
do and automatically react or properly throw errors. It's very easy to believe
you'll need the most robust system, this rarely reduces time spent coding for
both the tools developer and content creators.

It's very important to make sure your system can be debugged, even those not
using virtual machines or a seemingly simple system. Error checking is little
work when automated and a major headache if left invisible.
