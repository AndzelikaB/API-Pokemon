'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

// gulp.task('run', ['sass']);

// gulp.task('watch', function() {
//   gulp.watch('./scss/**/*.scss', ['sass']);
// });

gulp.task('default', function(){
  return gulp.watch('./scss/**/*.scss', gulp.series('sass'));
});