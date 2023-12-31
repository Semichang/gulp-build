// Основной модуль
import gulp from 'gulp';
// Импорт путей
import { path } from "./gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from './gulp/config/plugins.js';

// Передаём значения в глобальную переменную
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    withFonts: process.argv.includes('--fonts'),
    withoutFonts: !process.argv.includes('--fonts'),
    path: path,
    gulp: gulp,
    plugins: plugins,
}

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSprive } from './gulp/tasks/svgSprive.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';
// import { puplish } from './gulp/tasks/ghpages.js';
import { gitignore } from './gulp/tasks/cgignore.js';
import { gitDeloy } from './gulp/tasks/git.js';



// Наблюдатель за изменениями
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
    gulp.watch(path.watch.svgicons, svgSprive)
    gulp.watch(path.watch.fonts, fonts)
}
// Загрузка на github


// Обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)

// Основные задачи
let mainTasks
if (app.withFonts) {
    mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));
} else {
    mainTasks = gulp.series(gulp.parallel(copy, html, scss, js, images));
}


// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks, zip);
const deployFtp = gulp.series(reset, mainTasks, ftp);
const deployGit = gulp.series(gitDeloy);

export { dev }
export { build }
export { deployZip }
export { deployFtp }
export { svgSprive }
export { deployGit }
export { fonts }

// Выполнение сценария по умолчанию
gulp.task('default', dev);
gulp.task("creategitignore", gitignore);