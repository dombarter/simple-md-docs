#!/usr/bin/env node

"use strict"

// Dependencies
const program = require('commander')
const generatePDF = require("./modules/generate-pdf")
const lazyPDF = require("./modules/lazy-pdf")
const createTemplate = require("./modules/init")
const {version} = require("./package.json")
const path = require("path")

const handleInit = async (dir) => {

    if (!dir) {
        dir = "./"
    }
    dir = path.join(process.cwd(), dir)
    await createTemplate(dir)
    process.exit(1)

}

const handleCreate = async (configFile) => {

    configFile = path.join(process.cwd(), configFile)
    await generatePDF(configFile)
    process.exit(1)

}

const handleLazy = async (markdownFile) => {

    markdownFile = path.join(process.cwd(), markdownFile)
    await lazyPDF(markdownFile)
    process.exit(1)

}

const main = async () => {

    // Init function
    program
    .command('init [dir]')
    .description('create a template config.json and markdown folder in a given location. (default: \'./\')')
    .action(handleInit)

    // Create function
    program
    .command('create [configFile]')
    .description('create a pdf based off a provided config file. (default: \'./config.json\')')
    .action(handleCreate)

    // Lazy function
    program
    .command('lazy <markdownFile>')
    .description('create a pdf off a single markdown file without the need for a config file. pdf name matches markdown file name.')
    .action(handleLazy)

    program
    .version(version, '-v, --version', 'output the current version');
    
    program
    .parse(process.argv)

}

main()