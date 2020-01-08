var gulp = require('gulp');
var sass = require('gulp-sass');
var sasslint = require('gulp-sass-lint');
var iconfont = require('gulp-iconfont');
var runTimestamp = Math.round(Date.now()/1000);
var iconfontCss = require('gulp-iconfont-css');
const autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

function style(){

    return gulp.src('./app/scss/**/*.scss')
    .pipe(
        sasslint({
            configFile: 'sass-lint.yml'
        })
    )
    .pipe(sasslint.format())
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream())
}

var fontName = 'fontname';
function icon(){
    return gulp.src('./app/assets/icons/*.svg')
    .pipe(iconfontCss({
        fontName: fontName,
        path: './app/assets/css/templates/_icons.scss',
        targetPath: '../../scss/config/_icons.scss',
        fontPath: '../assets/fonts/'
      })
    )
    .pipe(iconfont({
        fontName: fontName,
        prependUnicode: true, 
        formats: ['ttf', 'eot', 'woff', 'woff2'], 
        timestamp: runTimestamp, 
      })
    )
    .on('glyphs', function(glyphs, options){
        console.log(glyphs, options);
      })
    .pipe(gulp.dest('./app/assets/fonts'));
}

function watch(){

    browserSync.init({
        server: {
            baseDir:'./'
        }
    });

    style();
    gulp.watch('./app/scss/**/*.scss', style)
    gulp.watch('./**/*.html').on('change',browserSync.reload);
    gulp.watch('./js/**/*.js').on('change',browserSync.reload);
}

exports.style = style;
exports.icon = icon;
exports.watch = watch;
