'use strict';

var gulp       = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass       = require('gulp-sass'),
    rename     = require('gulp-rename'),
    concat     = require('gulp-concat'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    minifycss  = require('gulp-minify-css'),
    browserify = require('browserify'),
    watchify   = require('watchify'),
    babel      = require('babelify'),
    livereload = require('gulp-livereload'),
    gutil      = require('gulp-util');


function compile(watch) {
  var bundler = watchify(
                  browserify({
                                entries: ['./JS/main.js'],
                                cache: {},
                                packageCache: {}
                              })
                    .transform(babel.configure({
                      ignore: /(bower_components)|(node_modules)/
                    }))
                 );

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) {
                      console.error(err);
                       this.emit('end');
      })
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public'))
      .pipe(livereload());
  }

  if (watch) {
    bundler.on('update', function() {
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', function() {
                      return compile();
                    });
gulp.task('watch-js', function() {
                        return watch();
                    });

gulp.task('watch-html', function() {
  return gulp.src('./public/*.html')
            .pipe(livereload());
});

gulp.task('watch-sass', function () {
  return gulp.src('./SCSS/main.scss')
            .pipe(sass({
                        style: "nested",
                        noCache: true
                    }))
                .on('error', gutil.log)
            .pipe(gulp.dest('./public/'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('./public/'))
            .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();

  gulp.watch(['./SCSS/*.scss', './SCSS/**/*.scss', './SCSS/**/**/*.scss'], ['watch-sass']);
  gulp.watch(['./JS/*.js', './JS/**/*.js'], ['watch-js']);
  gulp.watch(['./public/*.html'], ['watch-html']);
})

gulp.task('default', ['watch']);
