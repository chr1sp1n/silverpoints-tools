var babel = require('@babel/core');
var path = require('path');
var fs = require('fs')

module.exports = function(options){
	return function(req, res, next){
		if(path.extname(req.originalUrl) == '.js'){
			var filename = path.basename(req.originalUrl);
			var fileSource = path.join(__dirname,'/src/js/', filename);
			var fileDestination = path.join(__dirname,'/public/javascripts/', filename);
			if (fs.existsSync(fileSource) ){
				var result = babel.transformFileSync( fileSource,
				{
					filename,
					ast: false,
					code: true,
					minified: true,
					compact: true,
					comments: false
				});
				fs.writeFile(fileDestination, result.code, (err) => {
					if (err) throw new Error(`${fileDestination} write error: ${err}`);
				});
				// , function(err, result){
				// 	if(err) {
				// 		console.error('Babel error:', err);
				// 	}else{
				// 		fs.writeFile(fileDestination, result.code, (err) => {
				// 			if (err) throw new Error(`${fileDestination} write error: ${err}`);
				// 		});
				// 	}
				// });
			}
		}
		next();
	}
}
