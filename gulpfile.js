/**
 * Created by Pavlo_Oliynyk on 10/2/2015.
 * npm init - если забыли предворительно создать packege.json
 * autoprefixer — автоматически расставляет префиксы к CSS свойствам
 */
module.exports = gulp;

var config = {
    destanationCssFolder: 'app/css',
    srcSCSS : 'app/scss/*.scss'
}

var gulp = require('gulp'),
    sass = require('gulp-sass'),//for converting scss to css
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    ngAnnotate = require('gulp-ng-annotate'),//minify AngularJs files
    minifyCss = require('gulp-minify-css');/*minify-css : npm install --save-dev gulp-minify-css*/


/**/
gulp.task('scss', function () {
    gulp.src(config.srcSCSS)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.destanationCssFolder));//save to 'app/css' as global.css
});


/**/
gulp.task('default', function () {
    console.log('***start autoprefixer');
    return gulp.src('app/css/global.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCss()) //minify css
        .pipe(gulp.dest(config.destanationCssFolder));//save to 'app/css' as global.css
    livereload.listen()
});

/*uglify : npm install --save-dev gulp-uglify*/
var uglify = require('gulp-uglify'); //only for pure JS

gulp.task('compressJS', function() {
    return gulp.src('app/uglifiedJs/*.js')
        .pipe(uglify())
        .pipe(livereload())
        .pipe(gulp.dest('app/uglifiedJs/minified'));

});

/*ngAnnotate - to minify AngularJS files*/
gulp.task('compressAngular', function() {
    return gulp.src('app/javascript/*.js')//read
        .pipe(ngAnnotate())
        .pipe(gulp.dest('app/uglifiedJs'));//write
});

/*-----------------*/
gulp.task('watch', function () {

    gulp.watch('app/scss/*.scss', ['scss']);
    gulp.watch('app/css/global.css', ['default']);
    gulp.watch('app/javascript/*.js', ['compressAngular']); //only for pure JS
    gulp.watch('app/uglifiedJs/*.js', ['compressJS']); //only for pure JS

    livereload.listen()//not work


});





