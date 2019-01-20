/*jshint esversion: 6*/

const gulp = require('gulp');
const {watch} = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');
const express = require('express');
const app = express();
const gutil = require('gulp-util');
const path = require('path');
const data = require('gulp-data');

app.use(express.static(path.resolve('./build')));

app.listen('8080', function() {
  gutil.log('Listening on', '8080');
});

gulp.task('html', function() {
  gulp.src('pug/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build'))
    .pipe(livereload());
});

gulp.task('css', function() {
  gulp.src(['css/*.css', 'sass/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(livereload());
});

gulp.task('images', function() {
  gulp.src('images/*')
  .pipe(gulp.dest('build/images'))
  .pipe(livereload());
});

gulp.task('js', function() {
  gulp.src('js/*/**')
  .pipe(gulp.dest('build/js'))
  .pipe(livereload());
});

gulp.task('watch', ['build'], function() {

  livereload.listen();

gulp.watch('pug/**/*.pug', ['html']);
gulp.watch('sass/*.scss', ['css']);
gulp.watch('images/*', ['images']);

});

gulp.task('build', ['html', 'css', 'images', 'js']);
