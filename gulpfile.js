var gulp = require('gulp');
var nodeUnitRunner = require("gulp-nodeunit-runner");
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');


gulp.task('watch', function () {
    watch('src/**/*.js', ['test']);
});

gulp.task('test', function () {
    return gulp.
        src('src/**/*.js').
        pipe(nodeUnitRunner());
});
