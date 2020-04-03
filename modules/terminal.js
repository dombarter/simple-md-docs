/**
 * Used to display the current error on the screen
 */
const readline = require("readline")
let creationStarted = false
let interval

// Start the pdf creation
module.exports.start = async (outputFile) => {

    creationStarted = true
    const OUTPUT_MESSAGE = `Generating PDF in ${outputFile}`

    let dots = 0

    interval = setInterval(() => {
        readline.clearLine(process.stdout, 0)
        readline.cursorTo(process.stdout, 0, null)
        process.stdout.write(OUTPUT_MESSAGE + ".".repeat(dots))
        dots = (dots + 1) % 4
    }, 250)
}

// Cancel the process and output an error
module.exports.error = async (error) => {

    creationStarted = false
    clearInterval(interval)
    readline.clearLine(process.stdout, 0)
    readline.cursorTo(process.stdout, 0, null)
    console.error(`ERROR: ${error}`)

}

// Completed
module.exports.finish = async () => {

    creationStarted = false
    clearInterval(interval)
    readline.clearLine(process.stdout, 0)
    readline.cursorTo(process.stdout, 0, null)
    process.stdout.write("PDF has been generated!")

}