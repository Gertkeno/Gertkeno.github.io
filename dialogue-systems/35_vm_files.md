VM - File Reader
----------------

Constructing our byte-strings by reading the text files first requires
formatting. I really like
[markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
so I based *ADF* around it. A line-based formatting approach makes for easy
programming, and can interfere with stylized/rich text formatting like
[RTF](http://www.pindari.com/rtf1.html).

When creating *ADF*'s formatting we only had to consider two parts; how to
assign byte-strings a name for later reference, and how to specify the type
per byte. Naming byte-strings was easy, any special character(s) to make a
line or block stand out will do. Now specifying byte type certainly needs to be
a key-value pair with some short hands for common functions.

```markdown
# Esme_Success
I'll be right there.
	~name: Esme
Esme is on her way.
	~name: Entity
	~set: dl_someone_enroute
	~set: dl_esme_spoke
	~special: sound_off

# Rakesh_Success
Patience, if you please.
	~name: Rakesh
Rakesh is on his way.
	~name: Entity
	~set: dl_someone_enroute
	~set: dl_rakesh_spoke
	~special: sound_off
```

This example shows we used '#' to mark the start of a new byte-string. We enclose
byte types in `~function:` and the byte text as anything afterwards. Lines
without a `~function:` at the start are treated as `~SAID_TEXT:`, our shorthand.

Reading our line based files will look like this, proper error checking will
massively expand this constructor, but it's well worth it.

```cpp
VM::VM (const std::string & filename)
{
	std::ifstream infile (filename);
	if (!infile.is_open())
		throw std::runtime_error {"couldn't open file! " + filename};

	std::string line;
	std::forward_list <Byte> * writingTo = nullptr;
	while (std::getline (infile, line))
	{
		line = trim_whitespace (line);
		switch (line [0])
		{
		case '#':
			// we create our lists backwards with push_front()
			if (writingTo != nullptr)
				writingTo->reverse();

			// name new byte-string
			writingTo = &dialogue [line.substr (1)];
			break;
		case '~':
			if (writingTo != nullptr)
			{
				// is function of name:
				const auto colonPoint {line.find (':')};
				const auto functionName {line.substr (1, colonPoint-1)};
				const auto functionText {trim_whitespace (line.substr (colonPoint))};

				writingTo->push_front (Byte {functionName, functionText});
			}
			break;
		default:
			// is function SAID_TEXT
			if (writingTo != nullptr)
				writingTo->push_front (Byte {Byte::SAID_TEXT, line});
			break;
		}
	}
}
```

This format is reliant on the first character on a line, this makes it easy to
expand for more shorthand or unique functions. Keep in mind this sample code
doesn't check for any potentially extreme errors, like reading the same `# name`.
Validating function inputs will be the bulk of your error checking, it's very
important to highlight any potential syntax or logic errors.

I'll write out the `trim_whitespace()` function, and the string based type Byte
constructor for completions sake.

```cpp
inline std::string trim_whitespace (const std::string & in)
{
	unsigned index {0};
	while (index < in.length() and std::isspace (in [index]))
		index++;

	if (index >= in.length() or index == 0)
		return in;

	return in.substr (index);
}

Byte::Byte (std::string type, std::string value)
	: text (value)
{
	struct
	{
		std::string key;
		EType_t value;
	} static const tostr[] = {
		{"set", SET},
		{"special", SPECIAL},
		{"name", NAME},
	};

	// tolower the entire input
	std::transform (type.begin(), type.end(), type.begin(), ::tolower);

	for (auto & i : tostr)
		if (i.key == type)
			function = i.value;
}
```
