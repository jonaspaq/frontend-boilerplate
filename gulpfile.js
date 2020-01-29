
const gulp = require('gulp');
const sass = require('gulp-sass');
const JSminify = require('gulp-minify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
 
sass.compiler = require('node-sass');

// Html
gulp.task('html', function(){
    return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist/'))
})

// Scss compilation
gulp.task('scss', function () {
    return gulp.src('./src/assets/css/style.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', gulp.series(gulp.task('scss')), sass.logError))
    .pipe(gulp.dest('./dist/assets/css/'))
});

// JS minify
gulp.task('js:minify', function() {
    return gulp.src('./src/assets/js/main.js')
      .pipe(JSminify())
      .pipe(gulp.dest('./dist/assets/js/'))
});

// JS watch
gulp.task('watch:js', function(){
    gulp.watch('./src/assets/js/**/*.js').on('change', gulp.series('js:minify', browserSync.reload))
});

// Watch Scss
gulp.task('watch:scss', function(){
    gulp.watch('src/assets/css/**/*.scss').on('change', gulp.series('scss', browserSync.reload))
});

// Image minify
gulp.task('imagemin', function(){
    return gulp.src('src/assets/images/*')
        .pipe(imagemin()).on('error', gulp.series(gulp.task('imagemin')), imagemin.logError)
        .pipe(gulp.dest('dist/assets/images'))
})

// Browser Sync
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            browsers: ['*']
        }
    });

    // Watch these directories
    gulp.watch("src/assets/images/**/*.*").on('change', gulp.series('imagemin', browserSync.reload));
    gulp.watch("src/*.html").on('change', gulp.series('html', browserSync.reload));
});


gulp.task('default', gulp.parallel('html', 'scss', 'js:minify', 'watch:js', 'watch:scss', 'imagemin', 'serve'))