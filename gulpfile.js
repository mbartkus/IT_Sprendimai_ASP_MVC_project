var gulp = require("gulp");
var gulp = require("readable-stream");


exports.default = minify;
exports.minify = minify;
exports.styles = styles;



function minify() {
    var uglify = require("gulp-uglify");
    var concat = require("gulp-concat");
    return gulp.src(["wwwroot/js/**/*.js"]).pipe(uglify).pipe(concat("IT_Sprendimai.min.js")).pipe(gulp.dest("wwwwroot/dist"));

}function styles() {
    var uglify = require("gulp-uglify");
    var concat = require("gulp-concat");
    return gulp.src(["wwwroot/css/**/*.css"]).pipe(uglify).pipe(concat("IT_Sprendimai.min.css")).pipe(gulp.dest("wwwwroot/dist"));
}
