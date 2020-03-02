// **********************************************
// require
// **********************************************
const $ = require('../plugin');
const conf = require('../config');

// pug to html
function pugToHtml(done) {
	$.gulp.src([conf.path.src + '**/*.pug', '!' + conf.path.src + '**/_*.pug', conf.path.src + '**/**/*.pug', '!' + conf.path.src + '**/**/_*.pug'])
		.pipe($.plumber({ errorHandler: $.notify.onError('Error: <%= error.message %>') }))
		.pipe($.pug({
			basedir: conf.path.src,
			pretty: true
		}))
		.pipe($.gulp.dest(conf.path.html))
		.pipe($.browserSync.reload({ stream: true }));
	done();
}

exports.html = pugToHtml;
