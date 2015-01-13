// var req = http.request(options, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   res.setEncoding('utf8');
//   res.on('data', function (chunk) {
//     console.log('BODY: ' + chunk);
//   });
// });

var http     = require('http');
var Thenable = require('./vendor/Thenable');

var DEFAULT_HOST = 'delighted.com';
var DEFAULT_PORT = 443;

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

  var promise = new Thenable();
  var request = http.request(options, function(response) {
    response.setEncoding('utf8');

    response.on('data', function(chunk) {
      promise.resolve(response);
    });
  });

  request.on('error', function(error) {
    promise.reject(error);
  });

  request.end();

  return promise;
};

module.exports = Client;
