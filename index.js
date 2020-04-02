#!/usr/bin/env node

"use strict"

// Dependencies
const program = require('commander')
const generatePDF = require("./modules/generate-pdf")

const main = async () => {

    // Get the config path from the command line
    const configPath = program.parse(process.argv).args[0]

    // Attempt to generate the pdf
    const generateResult = await generatePDF(configPath)

}

main()