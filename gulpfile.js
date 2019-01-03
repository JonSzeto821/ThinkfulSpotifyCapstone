const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');

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
