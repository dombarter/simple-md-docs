#!/usr/bin/env node

"use strict"

// Dependencies
const program = require('commander')
const fs = require('fs')
const path = require('path')
const {mdToPdf} = require('md-to-pdf')
const {exec} = require("child_process")
const gh = require("github-markdown-css")

// Locating the installed directory
const findDir = () => {
    return new Promise((resolve, reject) => {
        exec("npm root", (err, stout, sterr) => {
            if (err || sterr) {
                reject()
            } 
            resolve(stout)
        })
    })
}

const main = async () => {

    // Get the config path
    let configPath
    configPath = program.parse(process.argv).args[0]
    if (!configPath) {
        console.log("No config file location was specified, using default location.")
        configPath = "config.json"
    }

    // Open the config file
    let config
    try {
        config = JSON.parse(fs.readFileSync(configPath).toString())
    } catch (e) {
        console.error("We couldn't find a config file at that location.")
        return
    }

    // Parse the config file
    let OUTPUT_FILE
    try {
        OUTPUT_FILE = config.output
        if (OUTPUT_FILE === undefined) {
            throw "error"
        }
    } catch (e) {
        console.error("Your config file is missing an 'output' location.")
        return
    }

    let MARKDOWN_LOCATION
    try {
        MARKDOWN_LOCATION = config.markdown
        if (MARKDOWN_LOCATION === undefined) {
            throw "error"
        }
    } catch (e) {
        console.log("No 'markdown' location was specified, using default location.")
        MARKDOWN_LOCATION = "markdown/"
    }

    let SECTIONS
    try {
        SECTIONS = config.sections
        if (SECTIONS === undefined) {
            throw "error"
        }
    } catch (e) {
        console.error("Your config file has no 'sections' specified.")
        return
    }

    // Attempt to open markdown files
    let mdContent = []
    for (const file of SECTIONS) {
        const src = path.join(configPath, "../", MARKDOWN_LOCATION, file.src)
        try {
            mdContent.push(fs.readFileSync(src).toString())
        } catch (e) {
            console.log(`Unable to open ${file.src}.`)
            return
        }
    }

    // Output begin creation
    console.log(`Creating pdf in ${OUTPUT_FILE}...`)

    // Adding page breaks to markdown
    const PAGE_BREAK = `<br><div style="page-break-after:always;"></div>`
    for (let i = 0; i < mdContent.length; i++) {
        let md = mdContent[i]
        if (i+1 < mdContent.length) {
            if (mdContent[i+1] !== "") {
                mdContent[i] = md + PAGE_BREAK
                continue
            } 
        }
    }

    // Merging all markdown into one file
    mdContent = mdContent.join("\n")
    mdContent = `<div class="markdown-body">\n\n` + mdContent + `\n\n</div>`

    // Setting the pdf options

    const CSS_PATH = path.join(await findDir(), "./github-markdown-css/github-markdown.css")
    console.log("Path =>", CSS_PATH)
    const CSS = fs.readFileSync(CSS_PATH)
    const FOOTER = 
    `
    <style>
        ${CSS}
    </style>
    <div class="markdown-body" style="width:100%;text-align:center;margin-bottom:12px;">
        <p>
            <span class="pageNumber">
        </p>
    </div>
    `

    const INPUT = {
        content: mdContent
    }
    const OPTIONS = {
        highlight_style: "github",
        dest: path.join(configPath, "../", OUTPUT_FILE),
        stylesheet: [
            CSS_PATH,
        ],
        pdf_options: {
            format: "A4",
            margin: "25mm 25mm",
            displayHeaderFooter: true,
            headerTemplate: '<span> </span>',
            footerTemplate: FOOTER
        }
    }

    // Creating the pdf
    const createPDF = async () => {
        await mdToPdf(INPUT, OPTIONS)
    }

    createPDF()

}

main()