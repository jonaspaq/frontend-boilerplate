// **********************************************
// require
// **********************************************
const $ = require('../plugin');
const conf = require('../config');

const imgs = [
  conf.srcDir.imgs + '**.{gif,jpg,png,svg}',
  conf.srcDir.imgs + '**/*.{gif,jpg,png,svg}'
];

//imgs compression
function imgMin(done) {
	$.gulp.src(imgs)
		.pipe($.imagemin([
			$.imagemin.gifsicle({ interlaced: true }),
			$.imagemin.mozjpeg({ quality: 75, progressive: true }),
			$.imagemin.optipng({ optimizationLevel: 5 }),
			$.imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]
		))
		.pipe($.gulp.dest(conf.htmlDir.imgs))
		.pipe($.browserSync.reload({ stream: true }));
	done();
}

exports.imgMin = imgMin;
