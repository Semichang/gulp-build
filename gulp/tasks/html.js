import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(fileinclude())
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(
            app.plugins.if
                (app.isBuild,
                    webpHtmlNosvg()))
        .pipe(
            app.plugins.if(
                app.isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '-v',
                        'cover': 0,
                        'to': [
                            {
                                "type": 'css',
                                "attr": ['custom-href']
                            },
                            {
                                'type': 'js',
                                'attr': ['custom-src']
                            },
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    }
                })
            )

        )
        .pipe(app.plugins.replace(/custom-(href|src)/g, match => {
            return match.replace("custom-", "")
        }))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());
}
// custom-(href|src)