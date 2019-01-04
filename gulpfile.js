const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');

//Minify Sass
function sassMin(cb) {
  gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/css'));
  cb();
}

//Optimize Images
function imageOpt(cb) {
  gulp.src('src/images/screenshots/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images/screenshots'));
  cb();
}

//Minify Js
function jsMin(cb) {
  gulp.src('src/javascript/*.js')
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(gulp.dest('public/javascript'));
  cb();
}

gulp.task('minify', gulp.parallel(sassMin, jsMin));

gulp.task('default', gulp.series('minify', imageOpt));

gulp.task('watch', () => {
  gulp.watch('src/scss/*.scss', gulp.series(sassMin));
  gulp.watch('src/images/screenshots/*', gulp.series(imageOpt));
  gulp.watch('src/javascript/*.js', gulp.series(jsMin));
});
