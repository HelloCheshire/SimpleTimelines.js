var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var babel        = require('gulp-babel');
var uglify       = require('gulp-uglify');
var notify       = require('gulp-notify');
var rename       = require('gulp-rename');


var source     = './';

gulp.task('sass', function() {
    return gulp.src('sass/simpletimeline.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./vendor'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src([source + 'scripts/*.js'])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('simpletimeline.js'))
    .pipe(gulp.dest(source + '/vendor'))
    .pipe(rename({
      basename: 'simpletimeline',
      suffix: '-min',
    }))
    .pipe(uglify())
    .pipe(gulp.dest(source + '/vendor'))
    .pipe(notify({ message: 'Scripts task complete', onLast: true }));
});

gulp.task('default', gulp.series(gulp.parallel('js', 'sass'), function() {

      browserSync.init({
      proxy: 'localhost:8888/SimpleTimelines.js',
    });

    gulp.watch("sass/**/*.scss", gulp.parallel('sass')).on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("scripts/**/*.js", gulp.parallel('js')).on('change', browserSync.reload);
}));
