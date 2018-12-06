const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require("browser-sync").create();

const SOURCE_DIR = './src';
const DIST_DIR = './dist';

gulp.task('sass', function() {
    return gulp.src(`${SOURCE_DIR}/sass/main.scss`)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(postcss([autoprefixer({browsers: ['last 2 version', 'IE 9']})]))
        .pipe(gulp.dest(`${DIST_DIR}/css`))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    var b = browserify({
        entries: [`${SOURCE_DIR}/js/main.js`]
    });

    return b.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(`${DIST_DIR}/js`))
        .pipe(browserSync.stream());
});

gulp.task('view', function() {
    return gulp.src(`${SOURCE_DIR}/*.html`)
        .pipe(gulp.dest(DIST_DIR))
        .pipe(browserSync.stream());
})

gulp.task('assets', function() {
    gulp.src(`${SOURCE_DIR}/assets/**`).pipe(gulp.dest(`${DIST_DIR}/assets/`));
});

gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: DIST_DIR,
        },
    });
});

gulp.task('watcher', function() {
    gulp.watch(`${SOURCE_DIR}/sass/**/*.scss`, ['sass']);
    gulp.watch(`${SOURCE_DIR}/js/**/*.js`, ['js']);
    gulp.watch(`${SOURCE_DIR}/assets/**/*`, ['assets']);
    gulp.watch(`${SOURCE_DIR}/**/*.html`, ['view']);
});


gulp.task('build', ['sass', 'js', 'view', 'assets']);
gulp.task('watch', ['build', "browser-sync", 'watcher']);