all: index.html resume portfolio catalog teaching-zig

index.html: index.md
	pandoc -s index.md -o index.html

.PHONY: test clean all resume portfolio catalog teaching-zig

resume:
	$(MAKE) -C resume

catalog:
	$(MAKE) -C catalog

portfolio:
	$(MAKE) -C portfolio
