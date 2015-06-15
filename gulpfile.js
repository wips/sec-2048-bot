var gulp = require('gulp');
var nodeunit = require("gulp-nodeunit");
var watch = require('gulp-watch');


gulp.task('watch', ['test'], function () {
    watch('src/**/*.js', ['test']);
});

gulp.task('test', function () {
    return gulp.
        src('src/**/*.js').
        pipe(nodeunit()).
        on('error', function(){
            this.emit('end');
        });
});
