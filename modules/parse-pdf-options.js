/**
 * Used to setup the pdf options ready to send to the create pdf function
 */

const fs = require("fs")
const path = require("path")

module.exports = async (configPath, outputFile, mdContent) => {

    // Setting the pdf options
    const CSS_PATH = path.join(__dirname, "../", "./github.css")
    const CSS = fs.readFileSync(CSS_PATH).toString()
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
        dest: path.join(configPath, "../", outputFile),
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

    // Return the parsed options
    return {
        input: INPUT,
        options: OPTIONS
    }

}