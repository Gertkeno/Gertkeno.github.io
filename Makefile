all: index.html resume portfolio catalog epoll-continuum

index.html: index.md
	pandoc -s index.md -o index.html

.PHONY: test clean all resume portfolio catalog epoll-continuum

resume:
	$(MAKE) -C resume

catalog:
	$(MAKE) -C catalog

portfolio:
	$(MAKE) -C portfolio

epoll-continuum:
	$(MAKE) -C epoll-continuum
