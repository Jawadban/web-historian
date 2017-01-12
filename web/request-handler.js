var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET'){
	if (req.url === '/'){
	  res.writeHead(200, {'content-type': 'HTML'});
	  fs.createReadStream(archive.paths.siteAssets + './index.html').pipe(res);
	  res.end();
	}
  } else {
	res.writeHead(404, {'content-type': 'text'});
	res.write('Error 404, request not found');
	res.end();
  }
  //res.end(archive.paths.list);
};
