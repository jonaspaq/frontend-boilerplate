// **********************************************
// require
// **********************************************
const $ = require('../plugin');
const conf = require('../config');

//SCSS
function compileScss(done) {
	$.gulp.src([conf.srcDir.scss + '**.scss', conf.srcDir.scss + '*/**.scss', conf.srcDir.scss + '*/*/**.scss'], { sourcemaps: true })
		.pipe($.plumber({
			errorHandler: $.notify.onError('Error: <%= error.message %>')
		}))
		.pipe($.sass(
			{
				outputStyle: 'compressed',
				// indentWidth: 2
			})
		)
		.pipe($.autoprefixer())
		.pipe($.gulp.dest(conf.htmlDir.css), { sourcemaps: './maps' })
		.pipe($.browserSync.reload({ stream: true }));
	done();
}

exports.style = { compileScss };
