all: index.html

index.html: Garrett_Hale_Tools_Programmer.md
	pandoc -s Garrett_Hale_Tools_Programmer.md -o index.html
	pandoc -s Garrett_Hale_Tools_Programmer.md -o garrett_hale_resume.pdf

clean:
	rm index.html

.PHONY: all clean test
