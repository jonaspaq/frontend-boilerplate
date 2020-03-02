// **********************************************
// require
// **********************************************
const $ = require('../plugin');

function syncBrowser(done) {
	$.browserSync({
		port: 3030,
		browser: ['chrome.exe'],
		server: {
			baseDir: './html/',
			index: 'index.html'
		},
	});
	done();
}

exports.bs = { syncBrowser };
