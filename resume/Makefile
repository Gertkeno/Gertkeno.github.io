all: index.html

index.html: index.md
	pandoc -s index.md -o index.html
	pandoc -s index.md -o garrett_hale_resume.pdf

clean:
	rm index.html

.PHONY: all clean test
