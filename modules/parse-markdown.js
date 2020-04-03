/**
 * Used to open all the markdown files and output the final markdown
 */

// Dependencies
const fs = require('fs')
const path = require("path")
const terminal = require("./terminal")

module.exports = async (configPath, markdownFolder, sections) => {

    // Attempt to open markdown files
    let mdContent = []

    for (const file of sections) {

        const src = path.join(markdownFolder, file)
        try {

            mdContent.push(fs.readFileSync(src).toString())

        } catch (e) {

            terminal.error(`Unable to open ${file}.`)
            return false

        }
    }

    // Add page breaks to markdown
    const PAGE_BREAK = `\n<br><div style="page-break-after:always;"></div>`

    for (let i = 0; i < mdContent.length; i++) {

        let md = mdContent[i]
        if (i+1 < mdContent.length) {

            if (mdContent[i+1] !== "") {

                mdContent[i] = md + PAGE_BREAK

            } 

        }

    }

    // Merging all markdown into one file
    mdContent = mdContent.join("\n")
    mdContent = `<div class="markdown-body">\n\n` + mdContent + `\n\n</div>`
    
    // Returning the mdContent
    return mdContent

}