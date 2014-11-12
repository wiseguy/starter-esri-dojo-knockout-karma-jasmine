/**
gulp commands
build - 
develop - 
serve -
*/

var gulp = require('gulp');

var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var autoprefixer = require('gulp-autoprefixer');


var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var minifyhtml = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');

var browserSync = require('browser-sync');
var del = require('del');
var $ = require('gulp-load-plugins')();

var app_dir = {
    src: __dirname + "/src/",
    build: __dirname + "/build/",
    css: "**/*.css",
    js: "**/*.js",
    images: "app/images",
    html: "**/*.htm"
};


gulp.task('default', function() {
    console.log(app_dir.src);
    // place code for your default task here
});

gulp.task('build-delete', function(cb) {
    console.log("deleting");
    del([app_dir.build + '**'], cb)
});

gulp.task('build-copy-clean', ['build-delete'], function() {
    console.log("cleaning up the build folder");
    return gulp.src(app_dir.src + '**')
        .pipe(gulp.dest(app_dir.build))
});

gulp.task('build-minify-css', ['build-copy-clean'], function() {
    console.log("minifying CSS");
    return gulp.src(app_dir.build + app_dir.css)
        .pipe($.minifyCss())
        .pipe(gulp.dest(app_dir.build))
});

gulp.task('build-uglify-js', ['build-copy-clean'], function() {
    console.log("Uglifying JS");
    return gulp.src(app_dir.build + app_dir.js)
        .pipe($.uglify())
        .pipe(gulp.dest(app_dir.build))
});

gulp.task('build-minify-html', ['build-copy-clean'], function() {
    console.log("Minifying HTML");
    var opts = {
        comments: true,
        spare: true
    };
    return gulp.src(app_dir.src + app_dir.html)
        .pipe(minifyhtml(opts))
        .pipe(gulp.dest(app_dir.build))
});

gulp.task('build-minify-image', function() {
    console.log("Minifying Images");
    return gulp.src(app_dir.src + app_dir.images + "/**/*")
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(app_dir.build + app_dir.images))
});

gulp.task('build', ['build-minify-css', 'build-uglify-js', 'build-minify-html', 'build-minify-image']);

gulp.task('serve', function() {
    console.log(app_dir.src + 'index.htm')
    browserSync({
        server: {
            baseDir: app_dir.src,
            index: '/index.htm'
        },
        files: [
            app_dir.src + app_dir.css,
            app_dir.src + app_dir.js,
            app_dir.src + app_dir.html
        ],

        watchOptions: {
            debouceDelay: 500
        },
        logLevel: "debug"
    })
});


/*********DEVELOP************/



gulp.task('compile-jade', function() {
    return gulp.src(app_dir.src + '**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(app_dir.src))
});

gulp.task('compile-stylus', function() {
    console.log("COMPILING");
    return gulp.src(app_dir.src + '**/*.styl')
        .pipe(stylus({
            errors: true,
            pretty: true
        }))
        .pipe(gulp.dest(app_dir.src))
});

gulp.task('autoprefix-css', ['compile-stylus'], function() {
    console.log("AUTO PREFIXING");
    return gulp.src(app_dir.src + '**/*.css')
        .pipe(autoprefixer(["last 2 versions"], {
            cascade: true
        }))
        .pipe(gulp.dest(app_dir.src))
});

gulp.task('develop', function() {
    // watch jade and style
    gulp.watch(app_dir.src + '**/*.jade', ['compile-jade']);
    gulp.watch(app_dir.src + '**/*.styl', ['autoprefix-css']);
});