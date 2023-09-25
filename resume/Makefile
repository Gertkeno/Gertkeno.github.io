all: index.html garrett_hale_resume.pdf

index.html: index.md
	pandoc -s index.md -o index.html

garrett_hale_resume.pdf: index.md
	pandoc -s index.md --pdf-engine=tectonic -o garrett_hale_resume.pdf

clean:
	rm index.html garrett_hale_resume.pdf

.PHONY: all clean test
