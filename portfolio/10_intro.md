---
pagetitle: Gert Portfolio
author: Garrett Hale
css: ../document.css
---

A Catalog of My Story in Reverse Chronological Order
====================================================

Vessels
-------

I was the lead programmer on a team of six developers making Vessels, a narrative
focused puzzle/exploration game. My main objective was to create a concise dialogue
system for designers to quickly write and test in-game dialogue and story paths.

I wrote a good amount on what tools we looked at, how I implemented this system
as a virtual machine, and what I believe are very important design philosophies
in my blog post [Game Dialogue Systems](/dialogue-systems/).

<video controls loop>
<source src="small_vessels.webm" type="video/webm">
</video>

---

Meme Game 2: 3D
---------------

I had an itch for OpenGL since I knew it would not only allow 3D but more
complex, fun rendering in general. I started with a sequel to "Meme Game" aptly
called ["Meme Game 2: 3D"](https://bitbucket.org/Gertkeno/meme-game-23d/downloads/).
The game is a boss-rush like *Star Fox 64* without the basic enemies, there is
a mini-game between bosses to collect power ups for later use. I wanted
specific audio features like looping music so I spent some time figuring out
SDL2's bare bones audio buffer system.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ZObwwNiPOq4?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

The following is a little trailer I made for "Meme Game 2", with less
debugging spheres and more thanking.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/p9rINCeBq4s?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

---

HTTPS Server
------------

I wrote an asynchronous HTTPS server in C++ using boost's ASIO library, to
prepare for Code2College teaching since I didn't have much web dev experience
before that. It should be live at [gerthouse.com](https://gerthouse.com/).

It's a link aggregate site hosted on a Raspberry Pi, my implementation is based
on [RFC2616](https://tools.ietf.org/html/rfc2616). Though I don't implement most
file manipulation functionality, instead sticking to what a browser would
normally send.

---

Meme Game
---------

My last 2D project before digging into 3D was ["Meme
Game"](https://bitbucket.org/Gertkeno/meme-game/downloads/) made for a
specific community, of which I even got some story and art help from!
It's asteroid controls doing boss fights, and the boss fights were very fun to
program. With help I could focus on programming and making the enemies unique.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/STzDAmqXj5c?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

This is the intended streamer playing the finished game.

<iframe src="https://www.youtube-nocookie.com/embed/Z1RxPUxIggQ?start=5925" width="560" height="315" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

---

Dad Slayer Six
--------------

This is a sample of ["Dad Slayer
Six"](https://bitbucket.org/Gertkeno/dadslayersix/downloads/) a
wave-based twin stick shooter with power ups and a turret thing. I later my
friend did audio, music, and some art. Coded in C++ with SDL2.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/0rdo_x2oDKE?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

---

Project Ant Farm
----------------

My first attempt at a proper 2D game is working-titled "Ant Farm". It's a idle
increment game using resource collection in such games as *Starcraft* or
*Age of Empires*. I argue it's still in development because I want to convert it
from 2D to 3D as a opportunity to study Vulkan.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/vvI1iAd-gqo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<!-- vim: set cc=80: -->
<!-- vim: set spell: -->
