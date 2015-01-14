var http     = require('http');
var Thenable = require('./vendor/Thenable');

var DEFAULT_HOST = 'delighted.com';
var DEFAULT_PORT = 443;

var Response = function(status, body) {
  this.status = status;
  this.body   = body;
};

var Client = function(options) {
  this.host = options.host || DEFAULT_HOST;
  this.port = options.port || DEFAULT_PORT;
};

Client.prototype.get = function(path) {
  var options = {
    hostname: this.host,
    port:     this.port,
    path:     path,
    method:   'GET'
  }

  return new Thenable(function(resolve, reject) {
    var wrapper = {};
    var request = http.request(options, function(response) {
      response.setEncoding('utf8');

      response.on('data', function(chunk) {
        wrapper.body = JSON.parse(chunk);
      });

      response.on('end', function() {
        wrapper.status = response.statusCode;
        resolve(wrapper);
      });
    });

    request.on('error', function(error) {
      reject(error);
    });

    request.end();
  });
};

module.exports = Client;
