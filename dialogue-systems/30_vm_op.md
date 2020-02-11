VM - Operation
--------------

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
		case Byte::LINK_TO:
			run_string (data_lookup (i.text));
			return true;
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
	void run_head();
private:
	// variables can be anything!
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
fast-forward key.

It's also important to find out what data needs to come out of your VM operations.
For displaying text it's usually just a `std::string`, while running could
return full state, a error code, or nothing! My advice here will be to try and
catch your errors while loading dialogue.

Conditional statements probably operate the same when running or reading, so we
can move this to it's own function as well.

```cpp
class VM
{
public:
	VM (const std::string & filename);

	using byte_itr = std::forward_list <Byte>::const_iterator;

	// returns if the run was successful
	bool run_head();

	// returns text to display, may be empty
	std::string read_head() const;
private:
	// returns a change in state
	bool byte_state (bool inState, const Byte & in) const;

	std::unordered_set <std::string> flags;

	std::unordered_map <std::string, std::forward_list <Byte>> dialogue;

	byte_itr playHead, playHeadEnd;
};
```

Implementing these functions is very similar to the stand alone function I wrote
before. The *ADF* structure requires byte-strings to start with `SAID_TEXT`, we
specify this so we can use `SAID_TEXT` as a sentential to halt. When the VM
picks back up we can grantee `playHead` is either `SAID_TEXT` or `playHeadEnd`.

Re-writing the standalone `run_string()` example function for our class certainly
looks larger, but the logic now checks for our sentinel and holds the play head
properly.

```cpp
bool VM::run_head()
{
	if (playHead == playHeadEnd)
		return false;

	// our run_head() should always start on a SAID_TEXT, or end
	playHead++;

	while (playHead != playHeadEnd and playHead->function != Byte::SAID_TEXT)
	{
		switch (playHead->function)
		{
		case Byte::SAID_TEXT:
			std::cout << playHead->text << std::endl;
			break;
		case Byte::LINK_TO:
			{
				const auto headText {playHead->text};

				// be weary, unordered_map::at() will throw
				// if headText isn't a valid key!
				playHead = dialogue.at (headText).begin();
				playHeadEnd = dialogue.at (headText).end();

				return true;
			}
		default:
			break;
		}

		playHead++;
	}

	return true;
}
```

<!-- vim: set cc=80: -->
<!-- vim: set spell: -->
