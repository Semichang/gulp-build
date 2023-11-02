import * as Git from "simple-git"
import fse from "fs-extra"
const { copySync } = fse
import * as fs from "node:fs"
import { gitOptions } from "../config/ghp.js"

const ghpages = function (options, callback) {
    const curOptions = {
        remoteUrl: options.linkToRepo ?? undefined,
        srcFolder: options.srcFolder ?? "src",
        destFolder: options.destFolder ?? ".publish",
        commit: options.commit ?? `Update ${(new Date()).toISOString()}`,
        branch: options.branch ?? "main",
        remote: options.remote ?? "origin",
    }
    if (fs.existsSync(`./${curOptions.destFolder}`)) {
        fs.rmSync(`./${curOptions.destFolder}`, { recursive: true })
    }
    fs.mkdirSync(`./${curOptions.destFolder}`, { recursive: true })
    const simpleGitOptions = {
        baseDir: `${curOptions.destFolder}`,
        binary: "git",
        maxConcurrentProcesses: 6,
        trimmed: false,
        config: ""
    }
    const git = Git.simpleGit(simpleGitOptions)



    console.log("Cloning repo start....");
    git.clone(options.remoteUrl, `.`).then(() => {
        console.log("Cloning repo finished");
        clearDist()
    })


    function clearDist(deletefiles) {
        if (typeof (deletefiles) != "undefined") {
            if (deletefiles.length === 0) { moveFiles() }
            else {
                fs.rmSync(deletefiles.pop(), { recursive: true, force: true })
                clearDist(deletefiles)
            }

        } else {
            let deleteFiles = fs.readdirSync(`./${curOptions.destFolder}`)
                .filter(filename => {
                    return filename !== ".git"
                })
                .map(filename => {
                    return `./${curOptions.destFolder}/${filename}`
                })
            clearDist(deleteFiles)
        }
    }

    function moveFiles() {
        copySync(curOptions.srcFolder, `./${curOptions.destFolder}`)
        addFilesToGit()

    }

    function addFilesToGit() {
        console.log("Add changes to repo....");
        git.add("./*").then(() => {
            console.log("Finished add changes");
            commitFilesToGit()
        })
    }
    function commitFilesToGit() {
        console.log("Commiting....");
        git.commit(curOptions.commit).then(() => {
            console.log("Commit finished");
            pushFilesToRepo()
        })

    }
    function pushFilesToRepo() {
        console.log("Pushed in repo....");
        git.push(curOptions.remote, curOptions.branch).then(() => {
            console.log(`${curOptions.srcFolder} pushed`);
            callback()
        })
    }
}

export const gitDeloy = (callback) => {
    ghpages(gitOptions, callback)


}