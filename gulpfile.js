var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    wiredep = require('wiredep').stream;

gulp.task('scss', function () {
    gulp.src('./app/scss/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./app/scss/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./app/css'));
});

gulp.task('css', function () {
    gulp.src('./app/scss/*.css')
        .pipe(gulp.dest('./app/css'))
})

gulp.task('watch',function(){
    gulp.watch('./app/scss/*.scss',['css']);
});

