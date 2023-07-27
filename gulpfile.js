const gulp = require('gulp')
//Плагины для postcss
const postcss = require('gulp-postcss')
//Переименование файла
const rename = require('gulp-rename');
//Автопрефиксы
const autoprefixer = require('autoprefixer');
//из scss в css
const Nested = require('postcss-nested')
//Автообновление браузреа
const browserSync = require('browser-sync').create();
//Карта
const sourcemaps = require('gulp-sourcemaps')
//Поддержка css4
const postcssPresetEnv = require('postcss-preset-env');
//Автоматическое скачивание и применение анимаций из animate.css
const postcssAnimation = require('postcss-animation')
//Автоматическое скачивание и подлючение шрифтов из GoogleFonts
const pfm = require('postcss-font-magician');
//Включение поддержки импортов
const atImport = require('postcss-import')
//Включение переменных
const pav = require('postcss-advanced-variables')
//Использование БЭМ
const bem = require('postcss-bem')
//Нормальный calc css
const calc = require('postcss-calc')
//Сортировка медиа запросов
const sortMediaQueries = require('postcss-sort-media-queries')

//SVG SPRITE
const svgSprite = require('gulp-svg-sprite')

//Компил JS ES6 в ES5
const babel = require('gulp-babel')
// служит для стилизации SVG
const cheerio = require('gulp-cheerio');

const plugins = [
    autoprefixer({browsers: ['last 2 version']}),
    require('postcss-advanced-variables'),
    require('postcss-import')(),
    Nested(),
    postcssPresetEnv(),
    postcssAnimation(),
    pfm(),
    calc(),
    sortMediaQueries({
        sort: 'mobile-first'
    })
]

gulp.task('postCss', ()=>{
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(postcss(plugins))
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(gulp.dest('./public/css/'))
        .pipe(browserSync.stream())
})

gulp.task('serve',  ()=> {
    browserSync.init({
        server: {
            baseDir: "./public/",
        }
    });
    gulp.watch("./public/css/**/*.css", browserSync.reload);
    gulp.watch("./public/*.html").on('change', browserSync.reload);
})

gulp.task('buildJs', ()=>{
    return gulp.src('./assets/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js/'))
        .pipe(browserSync.stream())
});

gulp.task('watch', ()=>{
    gulp.watch('./assets/scss/**/*.scss', gulp.series('postCss'))
    gulp.watch('./assets/js/**/*.js', gulp.series('buildJs'))
    gulp.watch('./assets/js/**/*.js', gulp.series('serve'))
    gulp.watch('./assets/scss/**/*.scss', gulp.series('serve'))
})
gulp.task('svg', ()=>{
    return gulp.src('./assets/svg/*.svg')
        .pipe(svgSprite({
            mode: {
                stack:{
                    sprite: "../sprite.svg",
                    // Генерировать CSS файл
                    render: {
                        css: true
                    },

                }
            }
        }))
        // Редактировать атрибуты SVG-элементов и удалить fill
        .pipe(cheerio({
            run: function($) {
                // Изменить fill на none у всех path и polygon элементов
                $('path, polygon').attr({
                    'fill': '',
                    'stroke': ''
                });
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        .pipe(gulp.dest('./public/imgs/icons/'))
})
gulp.task('default', gulp.series('watch'))