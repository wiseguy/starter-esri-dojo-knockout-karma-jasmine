/**
gulp commands
dist - 
watch - 
optimize -
*/

var gulp = require('gulp');

var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var autoprefixer = require('gulp-autoprefixer');

var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var minifyhtml = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');

var requirejs = require("requirejs");
var amdOptimize = require("amd-optimize");
var concat = require("gulp-concat");
//var amdOptimize = require('gulp-amd-optimizer');
var sourcemap = require('gulp-sourcemaps');

var browserSync = require('browser-sync');
var del = require('del');
var $ = require('gulp-load-plugins')();

var app_dir = {
    src: __dirname + "/src/",
    tests: __dirname + "/tests/",
    dist: __dirname + "/dist/",
    css: "**/*.css",
    js: "**/*.js",
    images: "app/images",
    html: "**/*.htm"
};


var requirejsOption = {
    baseUrl: 'src',
    paths: {
        'dojo': 'empty:',
        'dijit': 'empty:',
        'dojox': 'empty:',
        'esri': 'empty:',
        'app': 'app',
        'core': 'app/js/core',
        'components': 'app/js/components',
        'libs': 'app/js/libs',
        'js': 'app/js',
        'ko': 'app/js/libs/knockout-3.2.0',
        'bootstrap': 'app/js/libs/bootstrap.min'
    },
    // Name of the Entry File, minus the js
    name: 'app/startup',
    out: 'dist/startup-optimized.js'
}



gulp.task('default', function() {
    console.log(app_dir.src);
    // place code for your default task here
});

/*********Distributable************/

gulp.task('dist-delete', function(cb) {
    console.log(">>>>>>>> deleting");
    del([app_dir.dist + '**'], cb)
});

gulp.task('dist-copy-clean', ['dist-delete'], function() {
    console.log(">>>>>>>> cleaning up the dist folder");
    return gulp.src(app_dir.src + '**')
        .pipe(gulp.dest(app_dir.dist))
});

gulp.task('dist-minify-css', ['dist-copy-clean'], function() {
    console.log("minifying CSS");
    return gulp.src(app_dir.dist + app_dir.css)
        .pipe($.minifyCss())
        .pipe(gulp.dest(app_dir.dist))
});

gulp.task('dist-uglify-js', ['dist-copy-clean'], function() {
    console.log(">>>>>>>> Uglifying JS");
    return gulp.src(app_dir.dist + app_dir.js)
        .pipe($.uglify())
        .pipe(gulp.dest(app_dir.dist))
});

gulp.task('dist-minify-html', ['dist-copy-clean'], function() {
    console.log(">>>>>>>> Minifying HTML");
    var opts = {
        comments: true,
        spare: true
    };
    return gulp.src(app_dir.src + app_dir.html)
        .pipe(minifyhtml(opts))
        .pipe(gulp.dest(app_dir.dist))
});

gulp.task('dist-minify-image', function() {
    console.log(">>>>>>>> Minifying Images");
    return gulp.src(app_dir.src + app_dir.images + "/**/*")
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(app_dir.dist + app_dir.images))
});

gulp.task('dist-compile-coffee', function() {
    console.log(">>>>>>>> Compile Coffeescript");
    return gulp.src(app_dir.tests + "**/*.coffee") // path to your file
        .pipe(coffee())
        .pipe(gulp.dest(app_dir.tests));
});

gulp.task('dist', ['dist-minify-css', 'dist-uglify-js', 'dist-minify-html', 'dist-minify-image', 'dist-compile-coffee']);

/********RequieJS Optimizer********/

var amdConfig = {
    baseUrl: app_dir.src,
    path: {
        'core': 'app/js/core',
        'components': 'app/js/components',
        'libs': 'app/js/components',
        'js': 'app/js'
    },
    exclude: [
        'jQuery'
    ]
};

//amdOptimize.src("core/coreController", amdConfig)

gulp.task('requireopt', function() {
    requirejs.optimize(requirejsOption, function(res) {});
});

/*gulp.task('amdOpt', function() {
    return gulp.src(app_dir.src + app_dir.js)
        .pipe(amdOptimize("core/coreController"), [amdConfig])
        .pipe(concat("index.js"))
        .pipe(gulp.dest(app_dir.dist));
});*/

gulp.task('optimize', ['requireopt']);


/*********Serve************/

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


/*********Watch************/



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

gulp.task('watch', function() {
    // watch jade and style
    gulp.watch(app_dir.src + '**/*.jade', ['compile-jade']);
    gulp.watch(app_dir.src + '**/*.styl', ['autoprefix-css']);
});