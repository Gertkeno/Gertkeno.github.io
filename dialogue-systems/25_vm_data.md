VM - Data Structures
====================

First off a quick "VM 101". We'll fudge some of the specifics here but a virtual
machine uses programmer-defined bytecode instructions to operate on top of your
standard CPU instructions. The performance of virtual machines is always
slower than raw machine code, yet faster than most interpreted languages.
The defined bytecode can be very basic arithmetic and jumps, just like
enterprise CPUs.

You should define specific game or dialogue related bytecode. *ADF* has no
mathematics builtin, every operation is built to aid in dialogue cosmetics and
flow. Code samples like below will be shortened and *UE4* types will be replaced
with *stl* variants.

As reference I've attached this sample of dialogue the *ADF* parses and uses in
our game.

```markdown
# Question_Suicide
Yes... I am. And... I've asked you to not talk to me about this.
	~name: Esme
Peyton, please... I respect the subjects you don't want to discuss.
Please do not bring Marv up with me.
This subject seems to upset her most...
	~name: Entity
	~interest: Esme_Upset by Marv's suicide
We can use this.
	~link: ASPEYTON_QUESTION
```

Each piece of dialogue and function (the ~ part) is stored as a "byte" in the
machine. "Byte" used lightly as we keep the whole string in this bytecode
rather than referencing it elsewhere in memory.

```cpp
struct Byte
{
	enum EType_t
	{
		// COSMETIC
		SAID_TEXT,
		CHOICE_TEXT,
		NAME,

		// CONDITIONALS
		CONDITIONAL,
		INVERSE_CONDITIONAL,
		OR_CONDITIONAL,
		ALREADY_READ,
		AS_CREW,

		// MUTATORS
		SET,
		UNSET,
		INTEREST,
		SPECIAL,

		// FLOW CONTROL
		ALTER_START,
		LINK_TO,
		BREAK_TO,
	} function;

	std::string text;

	unsigned originLine;
	unsigned indent;
};
```

Structurally, this isn't what most people expect, and sadly that means I've
created a poor mental model for you.

So we create each byte with two main variables for our machine to operate on.
Each `EType_t` tells the VM what to do with the byte's `text` variable, for
merely displaying a `SAID_TEXT` operator will print the `text` variable on-screen.
The `SET` function will store a value of true in the VM, with `text` as the key,
for later state retrieval.

Most virtual machines are programmed to read bytecode until some sentinel is met.
*ADF* has separated functions for reading text, and operating on the VM state.
In both cases *ADF* reads a `SAID_TEXT` then continues to read any other `EType_t`
until it reaches a `SAID_TEXT` again. When just reading *ADF* only prints the
initial `SAID_TEXT` and checks for cosmetics that follow. When operating *ADF*
will set variables, potentially prepare another byte-string to read, and
finally move forward in the current byte-string, where reading and operating
will start for the next calls.

To help understand how we craft our Byte I'll take the last example and write
it as a array in C++ using the `struct Byte`.

```cpp
Byte Question_Suicide[] = {
	{Byte::SAID_TEXT, "Yes... I am. And... I've asked you to not talk to me about this."},
	{Byte::NAME,      "Esme"},
	{Byte::SAID_TEXT, "Peyton, please... I respect the subjects you don't want to discuss."},
	{Byte::SAID_TEXT, "Please do not bring Marv up with me." },
	{Byte::SAID_TEXT, "This subject seems to upset her most..."},
	{Byte::NAME,      "Entity"},
	{Byte::INTEREST,  "Esme_Upset by Marv's suicide"},
	{Byte::SAID_TEXT, "We can use this."},
	{Byte::LINK_TO,   "ASPEYTON_QUESTION"},
};
```

A typical virtual machine will try to read the whole byte-string or finish
prematurely, throw an error, and give up. This is why we track the last read
`SAID_TEXT` operator and re-feed the list at that start point, making `SAID_TEXT`
the "end" byte like `'\0'` for c-strings.

This example code conversion is mostly accurate with the caveat that we can't
create a custom named `Question_Suicide` array for what's declared in a text
file. We opted to use a `std::map <std::string, std::list <Byte>>` to achieve
this run-time array creation, where the `std::string` key is "Question_Suicide"
and the rest, is the byte-string in linked list form.

> When actually implementing I'd use
> [`std::unordered_map`](https://en.cppreference.com/w/cpp/container/unordered_map)
> and [`std::forward_list`](https://en.cppreference.com/w/cpp/container/forward_list)
> for simpler insertion complexity.

Byte-strings can take form of many data structures.  Arrays will be faster to
operate on but potentially slower to build. Linked lists will be quick to build
and slower to operate. For this reason our dialogue system builds linked lists
at the start of the game and operates over them during dialogue. Maps are
surprisingly fast for how feature rich they are; we use maps to title and track
the individual dialogue byte-strings.

<!-- vim: set cc=80: -->
<!-- vim: set spell: -->
