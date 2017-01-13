var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

var arrayList = [];

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function (error, data) {
    if (error) {
      throw error;
    }
    callback(error, data.split('/n'));
    //console.log(data);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(error, data) {
    if (data.indexOf(url) >= 0) {
      callback(error, true, data);
    } else {
      callback(error, false, data);
    }

  });
};
  // websitesInStorage.map(function(website) {
  //   (website === req.url) {

  //   }
  // });
// };
//fs.appendFile
exports.addUrlToList = function(url, callback) {
  exports.isUrlInList(function(error, isIn, data) {
    if (!isIn) {
      data.push(url);
      fs.writeFile(exports.path.list, data.join('/n'), function(error) {
        if (error) {
          throw error;
        }
        callback(error, isIn); 
      });
    }
  });
};

//fs.readDir
exports.isUrlArchived = function(url, callback) {
  fs.readFile(exports.paths.archivedSites + '/' + url, 'utf8', function(error, data) {
    if (error) {
      callback(error, false);
    } else {
      callback(error, true);
    }
  });
};

exports.downloadUrls = function(urls) {
  //get all urls in sites.txt
  //get all urls in archive
  //download all urls in sites.txt not in archives
  urls.forEach(function(url) {
    http.request({host: url}, function(response) {
      var site = '';
      response.on('data', function(chunk) {
        site += chunk;
      });
      response.on('end', function() {
        fs.writeFile(exports.paths.archivedSites + '/' + url, site);
      });
    });
    http.end();
  });
};
