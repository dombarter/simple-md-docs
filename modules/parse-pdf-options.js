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
    const OUTPUT = path.join(configPath, "../", outputFile)
    const OPTIONS = {
        highlight_style: "github",
        dest: OUTPUT,
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

    // try and make the output folder
    fs.mkdirSync(OUTPUT.replace(path.parse(OUTPUT).base, ""), {recursive: true})

    // Return the parsed options
    return {
        input: INPUT,
        options: OPTIONS
    }

}