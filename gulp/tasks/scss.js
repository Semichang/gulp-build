import dartSass from "sass";
import gulpSass from 'gulp-sass';
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css"; // Сжаьие css файла
import webpcss from "gulp-webpcss"; // Вывод WEBP изображений
import autoprefixer from "gulp-autoprefixer"; // Добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries";// Группировка медиа запросов

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev }) // Получаем файлы из папки scss
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        )) // Обработка ошибок импорта
        .pipe(sass({
            outputStyle: 'expanded'
        })) // Преобразование sass в css
        .pipe(app.plugins.replace(/@img\//g, '../img/')) // замена path autocomplete
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries())) // Группировка медиа запросов
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss(
                    {
                        webpClass: ".webp",
                        noWebpClass: ".no-webp"
                    }
                )
            )) // Подключение .webp
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserlist: ["last 3 version"],
                    cascade: true,
                })
            )
        ) // autoprefixer
        // Дубль
        // .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        ) // Сжатие css файла
        .pipe(rename({
            extname: ".min.css"
        })) // Добавление .min к расширению
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}