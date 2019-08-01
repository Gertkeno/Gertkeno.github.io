# Meme Game

---

## A Plan and Why

To set the scene I've worked on a quite few small 2D games with SDL2, including platformers, multiplayer games, and management simulators.
I wanted to start making 3D games and followed a brief tutorial at [open.gl](https://open.gl), it's a quick walk through and I was stumbling a fair amount while chasing more complex systems than presented in the tutorial.
However seeing as I didn't have a grand fully finished 2D game under my belt I decided to first create a in-joke of a game for a lovely online community I found myself a part of.

I wanted to make a boss fight centered game, it seemed like a good genre to code a lot of specific, odd, and unique actions.
I knew from my previous projects making art sucks.
I wanted to do 90% code, 10% art.
Doing so little of my own art would be tough for an original and creative project, at least without hiring a dedicated artist.
Luckily my target audience to some degree appreciates memes, instead of art I could pull stuff from the internet or streams.
By pandering to this community I'm almost guaranteed some kind of audience, thus two problems solved.

I wanted to a cut-scene system, with boss rush genre it would add some personality and/or jokes to the bosses.
I had experience parsing text so I ended up with a custom runtime text parser for dialogue.

I wrote some basic Asteroids/LUFTRAUSERS movement, filled a test intro.txt with the opening of 2003's Daredevil, and made the demo video below.

I sent this video to a member of the previously mentioned community, name of [Makin Bacon Bot](https://twitter.com/MakinBaconBot), in attempt to start collaborating with them.
Thankfully Makin agreed to write the cut scenes for the game, and design the boss made for him.  

## Boss Design

I started out with FrankerZ (Dog Face no space), this boss was made to test projectiles and hurt/hit circles.
Movement was minimal for this boss, just a set speed in a altering direction.
At this point in the project I had a background, temporary player, and an emote from twitch, FrankerZ.
I made projectiles call a function pointer on a timer, with FrankerZ I used this created bullets splitting off of bullets.

This function pointer projectile feature was more robust than needed and made it annoying to instanciate bullets.
Though I learned a lot about function pointers and C++'s `std::function` container.
I rarely called the function pointer so I should've used `std::function`, but I've always been overly worried about performance.

The whale, Lonny Linda is solely an individual parts test.
Since I wasn't using OpenGL I didn't have a proper way to connect the body segments, when turning the whale would split and overlap at the neck.
Below is how I kept the tail connected in a rope like style.

Continuing beyond those two I tried to make unique and interesting bosses with four moves each, a theme, and a reason for the player to move.

## Making The Ship

I wanted to copy LUFTRAUSERS' movement, so I did but without the
gravity part. It ended up drifting around a lot more than I'd like so I
added a system for special actions, with that a hard stop action.

I didn't think much about the system for special abilities, nor did I
think of a great way to connect the bosses to said system. Scoring was
simple and I would've rather had score be tied to the abilities than a
mega-man style boss defeat to ability system. I should've added some
text to describe what each ability does, there was plenty of space on
the screen for it.

The camera zoomed in/out directly based on distance from player to a
special point the boss held. This system would only move the camera if
either the boss or player moved out of the zoomed view.

Having a nice thruster effect wasn't straight forward with just SDL2, I
knew how I would've liked to do it in GL but I didn't know how to
implement GL at the time. I ended up adding these little red particles
![](https://bytebucket.org/Gertkeno/meme-game/raw/0e9049c93db96ef03d324961676a9b3a3cdac5a7/assets/ember.png)
all over the ship when moving. I liked this system enough to give Makin
the same sort draw effect, but with a crazy twist by making it blue
instead of red.

## Final Product

Here's the video of the intended audience playing Meme Game.

I'm happy with how it turned out front-end. I've started the sequel
since writing this, obviously with projects like these learning is the
main goal so I'm much happier with part 2's code so far.

It was great to make a game for and with a community, even if they just
wrote their name in the credits I'm happy they're a part of it.

And here's a [link to the game on GameJolt.](https://gamejolt.com/games/meme-game/163369)
