"use strict"

// Dependencies
const fs = require("fs")
const path = require("path")

const config = 
`{
    "output":"output.pdf",
    "markdown":"markdown/",
    "sections": [
        "section1.md",
        "section2.md"
    ]
}`

const markdown1 = 
`# Section 1

Welcome to section 1!`

const markdown2 =
`# Section 2

Welcome to section 2!`

module.exports = async (folder) => {

    // Initially create the folder
    fs.mkdirSync(folder, {recursive: true})
    
    // Create config file
    fs.writeFileSync(path.join(folder, "./config.json"), config)

    // Create markdown folder
    fs.mkdirSync(path.join(folder, "./markdown"), {recursive:true})

    // Create section1 & section2
    fs.writeFileSync(path.join(folder, "./markdown/section1.md"), markdown1)
    fs.writeFileSync(path.join(folder, "./markdown/section2.md"), markdown2)

}