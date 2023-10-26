import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
    // Поиск фалов шрифтов
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        // конвертация
        .pipe(fonter({
            formats: ['ttf']
        }))
        // выгружение
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
    // Поиск ttf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf, {}`)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        // Конвертация в woff
        .pipe(fonter({
            formats: ['woff']
        }))
        // Выгрузка
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

const FONT_WEIGHT_SIZE = {
    50: ['microline', 'micro'],
    100: ["hailine", 'hair'],
    150: ['thin'],
    200: ['ultralight'],
    250: ['extralight'],
    300: ['light'],
    350: ['semilight'],
    400: ["regular"],
    450: ['book'],
    500: ['medium'],
    550: ['-------'],
    600: ['demibold'],
    650: ['semibold'],
    700: ['bold'],
    750: ['heavy'],
    800: ['extrabold'],
    850: ['ultrabold'],
    900: ['black'],
    950: ['extrablack'],
    1000: ['ultrablack'],
}
const FONT_STYLE = {
    'italic': ['italic'],
    'oblique': ['oblique']
}

function getFontWeight(filename) {
    filename = filename.toLowerCase()
    for (let weight in FONT_WEIGHT_SIZE) {
        const zalupa = FONT_WEIGHT_SIZE[weight]
        for (let keyword of FONT_WEIGHT_SIZE[weight]) {
            if (`${filename}`.includes(keyword)) {
                return [weight, keyword]
            }
        }
    }
    return [400, 'regular']
}

function getFontStyle(filename) {
    filename = filename.toLowerCase()
    for (let style in FONT_STYLE) {
        for (let keyword of FONT_STYLE[style]) {
            if (`${filename}`.includes(keyword)) return style
        }
    }
    return 'normal'
}

export const fontsStyle = () => {
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            // if (!fs.existsSync(fontsFile)) {
            fs.writeFile(fontsFile, '', cb);
            let newFileOnly;
            for (var i = 0; i < fontsFiles.length; i++) {
                let fontFileName = fontsFiles[i].split('.')[0];
                if (newFileOnly !== fontFileName) {
                    let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                    let fontWeight = getFontWeight(fontFileName)
                    let fontStyle = getFontStyle(fontFileName)
                    fs.appendFile(fontsFile,
                        `@font-face {
                                // ${fontWeight[1]}
                                font-family: ${fontName};
                                font-display: swap;
                                src: url("../fonts/${fontFileName}.woff2") format(woff2), url("../fonts/${fontFileName}.woff") format(woff);
                                font-weight: ${fontWeight[0]};
                                font-style: ${fontStyle};
                            }\r\n`, cb);
                    newFileOnly = fontFileName;
                }
            }
            // } else {
            //     console.log(`Файл scss/fonts.scss уже существует. Для обновления файла нужно уго удалить!`);
            // }
        }
    });
    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }
}
