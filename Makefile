all: index.html resume portfolio teaching-zig

index.html: index.md
	pandoc -s index.md -o index.html

.PHONY: resume portfolio teaching-zig

resume:
	$(MAKE) -C resume

portfolio:
	$(MAKE) -C portfolio

teaching-zig:
	$(MAKE) -C teaching-zig
