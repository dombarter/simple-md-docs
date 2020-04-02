/**
 * Used to create a pdf (whole process)
 */

const parseConfig = require("./parse-config")
const parseMarkdown = require("./parse-markdown")
const parseOptions = require("./parse-pdf-options")
const path = require("path")
const {mdToPdf} = require("md-to-pdf")

module.exports = async (configPath) => {

    // Set the config path default value
    if (!configPath) {
        configPath = path.join("./config.json")
    }
    configPath = path.join(__dirname, "../", configPath)

    // Parse the config file
    const parseResult = await parseConfig(configPath)
    if (!parseResult) {
        return false
    }

    // Parse the markdown
    const markdownResult = await parseMarkdown(
        configPath,
        parseResult.markdown,
        parseResult.sections
    )
    if (!markdownResult) {
        return false
    }

    // Format the pdf options
    const optionsResult = await parseOptions(
        configPath,
        parseResult.output,
        markdownResult
    )
    if (!optionsResult) {
        return false
    }

    // Create the pdf
    const createResult = await mdToPdf(
        optionsResult.input,
        optionsResult.options

    )
    if (!createResult) {
        return false
    }

    // Final result
    return true

}