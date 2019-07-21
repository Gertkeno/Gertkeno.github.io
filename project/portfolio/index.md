Portfolio
=========

Video Evidence of Games I've Done
----------------------------------

The following is in-dev video games, since that's when I usually end up
making videos.

This is a sample of ["Dad Slayer
Six"](https://bitbucket.org/Gertkeno/dadslayersix/downloads/) a
wave-based twin stick shooter with power ups and a turret thing. I made
this for a co-worker who hated Panera. I later had my friend do audio,
music, and some art.

My last 2D project before digging into 3D was ["Meme
Game"](https://bitbucket.org/Gertkeno/meme-game/downloads/) made for a
specific community, of which I even got some story and art help from!
It's a astroid ship doing boss fights, and boss fights are fun to
program. The project was straight forward since I didn't have to do
anything but code.

This specific video is some muted basic game play.

And this is the intended streamer playing the finished game.

After all this flat stuff I had an itch for OpenGL since I knew it would
not only allow 3D but more complex, fun rendering in general. I started
with a sequel to "Meme Game" aptly called ["Meme Game 2:
3D"](https://bitbucket.org/Gertkeno/meme-game-23d/downloads/), I'm
happy with the front-end result, but a lot of the rendering code is
terrible. I did everythine except the music and cut scene backgrounds.

The following is a little trailer I made for "Meme Game 2", with less
debugging spheres and more thanking.

Non-Game Stuff
--------------

I wrote an HTTP server in C++ using boost's ASIO library, Somewhat to
prepare for Code2College teaching since I didn't have much web dev
experience before that. It should hopefully be live at
[gerthouse.com](http://gerthouse.com/). It's just a link aggregate site
hosted on a raspberrypi, I still need to implement the SSL/HTTPS things.

After teaching at Code2College I got a job in web development thanks to
Jorge's recommendation. No one asked me to do C++, but I still had some
fun learning that world. I'd be happy to work more web dev jobs.

This one is almost game related, I really wanted to compile assets
instead of packaging loose jpgs and wavefronts. I didn't end up doing
that for my first 3D game but I made a tool to help with the wavefront
data. [My wavefront to C
converter](https://github.com/Gertkeno/gert-wavefrontc) is a pretty
gross off and on project that just parses a [Wavefront
file](https://en.wikipedia.org/wiki/Wavefront_.obj_file) and spits out
two variables, a array of floats to represent the object, and the length
of that array.

Example from:

    # Blender v2.72 (sub 0) OBJ File: 'test.blend'
    # www.blender.org
    o Cube
    v 0.309889 -1.000000 -1.000000
    v 0.309889 -1.000000 1.000000
    v -0.323454 -1.000000 1.000000
    ...
    vt 0.431268 0.607233
    vt 0.567842 0.607233
    vt 0.567842 1.000000
    ...
    vn 0.000000 -1.000000 0.000000
    vn -0.000000 0.161600 0.986800
    vn 1.000000 0.000000 0.000000
    ...
    f 2/1/1 3/2/1 4/3/1
    f 7/4/2 6/5/2 31/6/2
    f 15/7/3 9/8/3 11/9/3

To:

    const float test_vertices[] = {
    0.309889, -1.000000, 1.000000, 0.431268, 0.607233, 0.000000, -1.000000, 0.000000,
    -0.323454, -1.000000, 1.000000, 0.567842, 0.607233, 0.000000, -1.000000, 0.000000,
    ...
    -0.323454, 1.038916, -0.937544, 0.849069, 0.113096, -1.000000, -0.005900, 0.001800, };
    const unsigned int test_len = 216;

`test_vertices` is much more consumeable for OpenGL buffers, and easily
compileable. Like how `xxd -i` works except specifically for Wavefront
files. Sadly Wavefront files are very limited for 3D animation so this
little app isn't useful for most devs.

Code Samples
------------

It's always tough to choose good bits of code. Two weeks from now I'll
learn some new pattern or library that make previously awesome code
redundant or overcomplicated. Here's some code I am, or was proud of.

This is some controller code that reads from SDL2's event queue to set
0.0 - 1.0 for each input configured in `_controls`. The main reason I
like this code is the use of function pointers and standardizing
joysticks, keyboard, and mouse inputs to one struct.

[source](https://bitbucket.org/Gertkeno/goat-tested-colosseum/src/master/src/Controller.cpp#lines-39),
[header](https://bitbucket.org/Gertkeno/goat-tested-colosseum/src/master/include/Controller.hpp).

```
    template<typename Func>
    void _search_input (Input::type_t t, int id, Func&& x)
    {
        for (auto & input: _controls)
        {
            if (input.myType != t or input.button != id)
                continue;

            x (&input);
        }
    }

    constexpr void digital_press (Input* t)
    {
        if (t->held < 1.0f)
            t->framePress = true;
        t->held = 1.0f;
    }

    constexpr void digital_release (Input* t)
    {
        t->held = 0.0f;
    }

    void Controller::manage_inputs (const SDL_Event* e)
    {
        auto digital_get {digital_release};
        switch (e->type)
        {
        case SDL_JOYBUTTONDOWN:
            digital_get = digital_press;
        case SDL_JOYBUTTONUP:
            // only joysticks need to be tested, return if not tracked
            if (not _tracked_joystick (e->jbutton.which))
                break;
            _search_input (Input::type_t::JOYBUTTON, e->jbutton.button, digital_get);

        case SDL_KEYDOWN:
            digital_get = digital_press;
        case SDL_KEYUP:
            _search_input (Input::type_t::KEYBOARD, e->key.keysym.sym, digital_get);
            break;

        case SDL_MOUSEBUTTONDOWN:
            digital_get = digital_press;
        case SDL_MOUSEBUTTONUP:
            _search_input (Input::type_t::MOUSE, e->button.button, digital_get);
            break;

        // axis
        case SDL_JOYAXISMOTION:
            if (not _tracked_joystick (e->jaxis.which))
                break;
            _search_input (Input::type_t::JOYAXIS, e->jaxis.axis, [e](Input* t)
            {
                t->held = static_cast<float>(e->jaxis.value) / t->axisMax;
                if (t->held < AXIS_DEAD_ZONE)
                    t->held = 0.0f;
                else if (t->held > 1.0f)
                    t->held = 1.0f;

                if (t->axisPass and t->held < AXIS_RESET_THRESHOLD)
                    t->axisPass = false;
                else if (not t->axisPass and t->held > AXIS_PRESS_THRESHOLD)
                {
                    t->framePress = true;
                    t->axisPass = true;
                }
            });
            break;
        }
    }
```
