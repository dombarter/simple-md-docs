/**
 * Used to parse the config file and return all correct info
 */

"use strict"

// Dependencies
const fs = require('fs')
const terminal = require("./terminal")

module.exports = async (filePath) => {

    // Create variables to hold the config details
    const configPath = filePath
    let config
    let outputFile
    let markdownFolder
    let sections

    // Open the config file
    try {

        config = JSON.parse(fs.readFileSync(configPath).toString())

    } catch (e) {

        terminal.error("We couldn't find a config file at that location or the config file you provided is not valid JSON.")
        return false

    }

    // Begin parsing the config file

    // Try find the output file
    outputFile = config.output
    if (outputFile === undefined) {
        terminal.error("Your config file is missing an 'output' location.")
        return false
    }

    // Try find the markdown folder
    markdownFolder = config.markdown
    if (markdownFolder === undefined) {
        terminal.error("Your config file is missing a 'markdown' folder.")
        return false
    }

    // Try find the sections array
    sections = config.sections
    if (sections === undefined) {
        terminal.error("Your config file has no 'sections' specified.")
        return false
    }

    // Validate that the sections contains items
    if (sections.length < 1) {
        terminal.error("Your 'sections' array doesn't contain any valid sections.")
        return false
    }

    const output = {
        output: outputFile,
        markdown: markdownFolder,
        sections: sections
    }

    return output
}