// **********************************************
// require
// **********************************************
const $ = require('./gulp/plugin')
const conf = require('./gulp/config')
const { bs } = require("./gulp/tasks/bs")
const { style } = require("./gulp/tasks/style")
const { html } = require("./gulp/tasks/html")
const { js } = require("./gulp/tasks/js")
const { imgMin } = require("./gulp/tasks/imgMin")

// // **********************************************
// // task set
// // **********************************************


// watch src directory
function watchProject(done) {
    // Source images Files
    $.gulp.watch([conf.srcDir.imgs + '*'], imgMin)
    // Scss
    $.gulp.watch([conf.srcDir.scss + '**.scss', conf.srcDir.scss + '**/*.scss', conf.srcDir.scss + '**/**/**.scss', conf.srcDir.scss + '**/**/**/**.scss'], style.compileScss)
    // Pug
    $.gulp.watch(['src/**.pug', 'src/*/**.pug'], html)
    // Scripts
    $.gulp.watch([conf.srcDir.js + '**.js', conf.srcDir.js + '*/**.js'], js.compileJS)

    done()
}

// Gulp task for development local
$.gulp.task('default',
    $.gulp.series(
        imgMin,
        bs.syncBrowser,
        style.compileScss,
        js.compileJS,
        html,
        watchProject,
    )
)

// Gulp task build for CI
// Can also be used for production
$.gulp.task('buildCI',
    $.gulp.series(
        imgMin,
        style.compileScss,
        js.compileJS,
        html
    )
)
