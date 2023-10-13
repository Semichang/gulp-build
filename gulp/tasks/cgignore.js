import fs from "fs"

function fsError(err) {
    if (err) {
        console.log("?????????");
        return
    }
}

export const gitignore = async function () {
    const rootfiles = fs.readdirSync("./").map(filename => {
        return app.plugins.nodePath.join(`./`, filename)
    }).filter(filename => { return `./${filename}` !== app.path.clean }).join("\n")
    fs.writeFile("./.gitignore", rootfiles, fsError)
}