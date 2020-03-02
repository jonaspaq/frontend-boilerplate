// **********************************************
// require
// **********************************************
const $ = require('../plugin')
const conf = require('../config')

//js
function compileJS(done) {
	$.gulp.src(['src/assets/js/**.js', 'src/assets/js/*/**.js'])
		.pipe($.plumber({ errorHandler: $.notify.onError("Error: <%= error.message %>") }))
		.pipe($.gulp.dest(conf.htmlDir.js))
		.pipe($.browserSync.reload({ stream: true }))
	done()
}


exports.js = { compileJS };
