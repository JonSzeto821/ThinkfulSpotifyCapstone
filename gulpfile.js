const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');

gulp.task('sass', () => {
  return gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
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

gulp.task('default', gulp.series(['sass', 'imageMin', 'scripts']));

gulp.task('watch', () => {
  gulp.watch('src/scss/*.scss', gulp.series('sass'));
  gulp.watch('src/images/screenshots/*', gulp.series('imageMin'));
  gulp.watch('src/javascript/*.js', gulp.series('scripts'));
});
