#!/usr/bin/env node

"use strict"

// Dependencies
const program = require('commander')
const generatePDF = require("./modules/generate-pdf")
const lazyPDF = require("./modules/lazy-pdf")
const createTemplate = require("./modules/init")
const {version} = require("./package.json")

const main = async () => {

    // Init function
    program
    .command('init [dir]')
    .description('create a template config.json and markdown folder in a given location. (default: \'./\')')
    .action(async (dir) => {

        if (!dir) {
            dir = "./"
        }
        await createTemplate(dir)
        process.exit(1)

    })

    // Create function
    program
    .command('create [configFile]')
    .description('create a pdf based off a provided config file. (default: \'./config.json\')')
    .option('-w, --watch','generate a new pdf whenever changes are made to the config file or markdown folder.')
    .action(async (configFile, cmdObj) => {

        if (cmdObj.watch) {
            console.log("watching")
        } else {
            await generatePDF(configFile)
            process.exit(1)
        }

    })

    // Lazy function
    program
    .command('lazy <markdownFile>')
    .description('create a pdf off a single markdown file without the need for a config file. pdf name matches markdown file name.')
    .option('-w, --watch', 'generate a new pdf whenever changes are made to the markdown file.')
    .action(async (markdownFile, cmdObj) => {

        await lazyPDF(markdownFile)
        process.exit(1)

    })

    program
    .version(version, '-v, --version', 'output the current version');
    
    program
    .parse(process.argv)

}

main()

// Config file default
// Watch function
// Title page
// Docs
// Publish