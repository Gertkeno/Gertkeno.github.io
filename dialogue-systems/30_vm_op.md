VM - Operation
==============

The simplest virtual machine is a function taking some container to operate
over; I'll demonstrate the easiest, hardest to work with implementation.

```cpp
bool run_string (const std::forward_list <Byte> data)
{
	for (auto & i: data)
	{
		switch (i.function)
		{
		case Byte::SAID_TEXT:
			std::cout << i.text << std::endl;
			break;
		default:
			std::cout << "unhandled function!" << std::endl;
			break;
		}
	}
	return true;
}
```

This function may be enough for you, but I'd like to leverage objects to make
some relationships between our dialogue and actors. Firstly any data from our
byte-strings will be lost without somewhere to keep it. Second this operates
an entire byte-string at a time, while useful for more programmatic cases we
need to stop, and wait for the player to continue the reading. By making a class
to house and run our dialogue we can attach this to actors and directly
associate text with them.

```cpp
class VM
{
public:
	// loads text file into our "dialogue" variable
	VM (const std::string & filename);

	using byte_itr = std::forward_list <Byte>::const_iterator;

	// operates based on the playHead
	void run_string();
private:
	// variables can be anything!
	std::string currentSpeaker;
	std::unordered_set <std::string> flags;

	// what a mouthful!
	std::unordered_map <std::string, std::forward_list <Byte>> dialogue;

	// track dialogue progression
	byte_itr playHead, playHeadEnd;
};
```

In *UE4* finding a place for persistent data may be daunting. Creating a basic
C++ "Game Mode" class with accessible data will persist through the game, just
remember to reset during a game over or save/load. With this your VM function
will pull and push data from *UE4*'s global variables, like your game mode class.

For this document I'm going to continue with the custom VM class definition.

When managing dialogue you'll likely want to display text, change state, and
move the play head forward. We benefit from separating this into at least two
functions, you might want to display text more than once, or skip ahead via a
fast-forward key. The change is minor for the header, but requires some planning.

It's also important to find out what data needs to come out of your VM operations.
For displaying text it's usually just a `std::string`, running could return full
state, a error code, or nothing! My advice here will be to try and catch your
errors while loading dialogue.

```cpp
class VM
{
public:
	VM (const std::string & filename);

	using byte_itr = std::forward_list <Byte>::const_iterator;

	// returns if the run was successful
	bool run_string();

	// returns text to display, may be empty
	std::string read_string() const;
private:
	std::string currentSpeaker;
	std::unordered_set <std::string> flags;

	std::unordered_map <std::string, std::forward_list <Byte>> dialogue;

	byte_itr playHead, playHeadEnd;
};
```

<!-- vim: set cc=80: -->
<!-- vim: set spell: -->
