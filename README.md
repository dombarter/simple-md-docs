# simple-md-docs
 
A simple command-line tool to create a sectioned pdf from a number of markdown files.


```
$ hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world 
```

## Installation

To install this tool:
```
$ npm i -g simple-md-docs
```

## Options

There are a number of options with our command-line tool:

* `init` - create a template config file and markdown folder, ready for you to make edits
* `create` - generate a pdf from a config file and a number of markdown files
* `lazy` - generate a pdf without the need for a config file, and a single markdown file

## Init

```
$ simple-md-docs init [directory]
```
*(defualt: ./)*

## Create

```
$ simple-md-docs create [configFile]
```
*(defualt: ./config.json)*

#### Information about the config file

The config file defines how your pdf is created and structured and must contain the following sections:

* Output location - `output` - the file name of where your pdf should be created (relative to the config file)
* Markdown folder - `markdown` - the folder where your markdown is stored (relative to the config file)
* Sections - `sections` - an array of markdown files to render in the pdf

If you are unsure of the layout of the config file - you can use the init command to create yourself template files. See above. 

#### Information about the pdf creation

* The pdf is created with the github css styles and github code highlighting
* The pages are automatically numbered for you
* Each section in the array will start on a new page

## Lazy

```
$ simple-md-docs lazy <markdownFile>
```

#### Information about lazy pdf creation

* The lazy function will generate a single pdf matching the name of your passed markdown file in the current working directory. 
* Lazy will make a pdf with the exact same styling and numbering as the create option.

## Updating the css 

**NOTE: only valid if you are editing this package, rather than using the cli tool**

To update the css file run:
```
npm run update
```

## Authors

This package has been written by Dom Barter.