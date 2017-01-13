var path = require('path');
var archive = require('../helpers/archive-helpers'); 
var fs = require('fs');
// require more modules/folders here!
var url = require('url');
var helpers = require('./http-helpers');

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') { 
    if (req.url === '/') {
      //send index.html
      res.writeHead(200, archive.headers);
      fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', function (error, data) {
        if (error) {
          throw error;
        }
        res.end(data);
      });
    } else if (archive.isUrlInList(req.url) && archive.isUrlArchived(req.url)) {
      // send url archive file
      
    } else {
      // invalid git request
      res.writeHead(404, archive.headers);
      res.write('Error 404, request not found');
      res.end();
    } 
  } 

*
  else if (req.method === 'POST') { 
    if (archive.isUrlArchived(req.url)) {  // && archive.isUrlInList(req.url) 
      //url is archived
      //send archived file 
      res.writeHead(200, archive.headers);
      fs.readFile(archive.pathsarchivedSites, 'utf8', function (error, data) {
        if (error) {
          throw error;
        }
        res.write(data);
        res.end();
      });
    } else if (!archive.isUrlInList(req.url)) {
  //add url to list
  //send client to loading.html.
    } else {
      res.writeHead(404, archive.headers);
      res.write('Error 404, request not found');
      res.end();
    }
  } 


  else {
    res.writeHead(405, archive.headers);
    res.end('Error 405, method not allowed');
  }
};
