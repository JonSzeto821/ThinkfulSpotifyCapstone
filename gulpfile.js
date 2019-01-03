const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');

gulp.task('sass', () => {
  return gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'));
})

//Optimize Images
gulp.task('imageMin', () => {
  return gulp.src('src/images/screenshots/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images/screenshots'));
});

//compile & minify js files to one files
gulp.task('scripts', () => {
  return gulp.src('src/javascript/*.js')
  .pipe(concat('main.js'))
  .pipe(terser())
  .pipe(gulp.dest('public/javascript'));
});

gulp.task('default', gulp.series(['sass', 'imageMin']));
