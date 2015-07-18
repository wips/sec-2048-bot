var gulp = require('gulp');
var nodeunit = require('gulp-nodeunit');
var watch = require('gulp-watch');
var babel = require('gulp-babel');

gulp.task('watch', ['transpile', 'test'], function() {
    watch('src/**/*.js', function(){
        gulp.start('test');
    });
});

gulp.task('test', function() {
    return gulp.
        src('src/**/*.js').
        pipe(babel()).
        pipe(gulp.dest('dist')).
        pipe(nodeunit()).
        on('error', function() {
            this.emit('end');
        });
});

gulp.task('transpile', function() {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});
