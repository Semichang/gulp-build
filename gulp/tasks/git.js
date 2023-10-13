import git from "gulp-git"
import fs from "fs"
import { gitOptions } from "../config/ghp.js"

function gitError(err) {
    if (err) throw err
}

export const gitDeloy = async () => {
    const pathRepo = gitOptions.remoteUrl.match(/[^\/]+(?=\.git)/)[0]
    if (!fs.access(pathRepo, err => { if (err) console.log(`[${timestamp}]Cloning`) })) {
        git.clone(gitOptions.remoteUrl, err => { if (err) throw err })
    }
    // git.pull("origin", "main", err => { if (err) throw err })
    // fs.cpSync(app.path.clean, pathRepo, { recursive: true })

}