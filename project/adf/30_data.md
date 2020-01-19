Data Structure
==============

Our system structures every non-blank line in a linked list, some are dialogue, some functions.
Reading through this linked list is a lot like reading null-terminated cstrings.
The system knows to stop and display text if the next node is of type `SAID_TEXT` or `nullptr`.

```cpp
// Structure for each line in text file

struct Line
{
	FString function_input;
	enum function_t
	{
		// Shortened list of function types
		SAID_TEXT,
		CHOICE_TEXT,
		NAME,

		CONDITIONAL,
		SET,
		UNSET,

		LINK_TO,
	} function;

	Line *next;
};
```

```bash
SAID_TEXT, "I've Been expecting you" --> NAME, "Rakesh" --> SAID_TEXT, "Please share your report" --> LINK_TO, "AsEsme_Choices" --> nullptr
```

In this example "I've been expecting you" will be displayed and the current talking character is set to Rakesh.
The player advances and "Please share your report" is displayed, the next page `#AsEsme_Choices` is queued.
Again the player advances and the queued page is loaded and read the same way.
If a page isn't queued then dialogue ends.
The last page loaded is sent to UE4 blueprints as an event trigger.

Here's the file version of the example.
The page's name is `Start_AsEsme`

```markdown
# Start_AsEsme

I've been expecting you.
	~name: Rakesh
Please share your report.
	~linkto: AsEsme_Choices
```

Pages, or linked list heads are stored in a `TMap <FString, Line *>`, a hash table,
so we can effectively use strings in a key, value pair.
