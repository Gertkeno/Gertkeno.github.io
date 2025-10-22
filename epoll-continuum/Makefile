all: index.html

index.html: index.md
	pandoc -s index.md --toc -o index.html

clean:
	rm index.html

.PHONY: all clean
