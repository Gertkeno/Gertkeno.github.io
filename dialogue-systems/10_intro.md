---
pagetitle: Game Dialogue Systems
author: Garrett Hale
---

Systems Intent
==============

Dialogue can be the focus of many games, if robust dialogue is the foremost
feature then it's important to create or use a system that can account for the
plethora of data and logistics behind simple game dialogue.

Some games, like Morrowind use dialogue for linear quest interactions, and
Morrowind houses a healthy amount of quests. In this scenario the game needs
to track multiple quest progressions, though that's the end of it.

Telltale's "The Walking Dead" uses a branching paths story in a hierarchic
structure, one choice always leads to a new choice, never repeating.
The hierarchy inherently provides structure used to create branches
and reduce branches back into a linear path.

Our team's game Airlock, we had a finite cast of characters and a spider-web
of dialogue for the player to unravel. We used [Twinery](https://twinery.org/)
to draft our story as the node-based system and robust state machine handles
our cyclical, evolving story. In Unreal we developed our own virtual machine
to handle dialogue, sewing programming and dialogue into one text file.
With a virtual machine like this we could create branching paths and out of
order execution for player progression.

When deciding on dialogue it's important to only pay for what you use.
A virtual machine could bog down performance if you only intend to use it for
barks, or eat up memory redundantly labelling and sorting your data.
Though trying to implement out of order execution in a hierarchical structure
would be too difficult, reliant on hacks, or impossible.

It's very important to make sure your system can be debugged, even those not
using virtual machines or any seemingly simple system. Error checking is little
work when automated and a major headache if left invisible.

<!-- vim: set cc=80: -->
<!-- vim: set spell: -->
