/**
 * Used to parse the config file and return all correct info
 */

"use strict"

// Dependencies
const fs = require('fs')
const path = require('path')

module.exports = async (filePath) => {

    // Create variables to hold the config details
    const configPath = path.join("../", filePath)
    let config
    let outputFile
    let markdownFolder
    let sections

    // Open the config file
    try {

        config = JSON.parse(fs.readFileSync(configPath).toString())

    } catch (e) {

        console.error("We couldn't find a config file at that location.")
        return false

    }

    // Begin parsing the config file

    // Try find the output file
    outputFile = config.output
    if (outputFile === undefined) {
        console.error("Your config file is missing an 'output' location.")
        return false
    }

    // Try find the markdown folder
    markdownFolder = config.markdownFolder
    if (markdownFolder === undefined) {
        console.error("Your config file is missing a 'markdown' folder.")
        return false
    }

    // Try find the sections array
    sections = config.sections
    if (sections === undefined) {
        console.error("Your config file has no 'sections' specified.")
        return false
    }

    // Validate that the sections contains items
    if (sections.length < 1) {
        console.error("Your 'sections' array doesn't contain any valid sections.")
        return false
    }

    return {
        output: outputFile,
        markdown: markdownFolder,
        sections: sections
    }
}