import ghPages from "gulp-gh-pages";
import { gitOptions } from "../config/ghp.js"

export const puplish = () => {

    return app.gulp.src(`${app.path.clean}/**/*.*`)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "GitHub",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(ghPages(gitOptions))
}