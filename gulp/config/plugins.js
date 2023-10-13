import * as nodePath from 'path';
import replace from "gulp-replace";// Поиск и замена
import plumber from "gulp-plumber";// Обработка ошибок
import notify from "gulp-notify";// Сообщения (подсказки)
import browsersync from "browser-sync"; //лок сервер
import newer from "gulp-newer"; // проверка обновления картинки
import ifPlugin from "gulp-if" // Условное ветвление

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin,
    nodePath: nodePath,
}