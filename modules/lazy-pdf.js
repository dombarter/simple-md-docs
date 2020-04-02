"use strict"

const generatePDF = require("./generate-pdf")
const fs = require("fs")
const path = require("path")
const terminal = require("./terminal")

module.exports = async (markdownFile) => {

    const TIMESTAMP = new Date().getTime()

    // Try and open the markdown file
    try {
        fs.readFileSync(markdownFile).toString()
    } catch (e) {
        terminal.error(`Unable to open ${markdownFile}`)
    }

    // Extract the markdown file name
    const filename = path.parse(markdownFile).name + ".pdf"

    // Create our own config file
    fs.writeFileSync(path.join(process.cwd(), `tmp-${TIMESTAMP}.json`),JSON.stringify({
        output: filename,
        markdown: "./",
        sections: [
            path.parse(markdownFile).base
        ]
    }))

    // Generate pdf based off this pdf
    await generatePDF(path.join(process.cwd(), `tmp-${TIMESTAMP}.json`))

    // Delete the config file
    fs.unlinkSync(path.join(process.cwd(), `tmp-${TIMESTAMP}.json`))
    return

}