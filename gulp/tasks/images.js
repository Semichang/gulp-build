import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
    return app.gulp.src(app.path.src.images) // Получение всех картинок
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            })
        )) // Обработка ошибок импорта
        .pipe(app.plugins.newer(app.path.build.images)) // Только новые файлы
        .pipe(
            app.plugins.if(
                app.isBuild,
                webp())) // Преобразование в webp
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.dest(app.path.build.images))) // Копирование в prodaction
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.src(app.path.src.images))) // Получение всех картинок
        .pipe(app.plugins.newer(app.path.build.images)) // Только новые файлы
        .pipe(
            app.plugins.if(
                app.isBuild,
                imagemin({
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    interlaced: true,
                    optimizationLevel: 3, // 0 to 7
                })
            )) // Сжатие картинок
        .pipe(app.gulp.dest(app.path.build.images)) // Копирование в prodaction
        .pipe(app.gulp.src(app.path.src.svg))// Получение всех sbg
        .pipe(app.gulp.dest(app.path.build.images))// Копирование в prodaction
        .pipe(app.plugins.browsersync.stream()); // Синхронизация с браузером
}