# simple-md-docs
 
A simple command-line tool to create a sectioned pdf from a number of markdown files.

## Installation

To install this tool:
```
npm i -g simple-md-docs
```

## Configuring the environment

You must create a JSON config file which specifies the following:

* Output pdf name (output)
* Folder location of the markdown files (markdown)
* Array of sections (sections)

Example config file:
```
{
    "output":"./output.pdf",
    "markdown":"./markdown/",
    "sections": [
        {
            "src": "section1.md"
        },
        {
            "src": "section2.md"
        }
    ]
}
```
Note: All file paths are relative to the location of the config file.a

## Creating the pdf

To create the pdf you must run the following command:
```
simple-md-docs <path to config file>
```
Eg.
```
simple-md-docs ./config.json
```

## Other notes

The default style used for both the markdown and the code highlighting is the Github styles. If you wish to change this please feel free to fork your own version. 

All pdfs come with page numbers automatically inserted. 

For each section you specify, the next section will start on a new page. 
