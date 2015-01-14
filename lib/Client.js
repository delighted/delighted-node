var http     = require('http');
var Thenable = require('./vendor/Thenable');

var errorMessages = {
  '401': 'Invalid API Key'
};

var Client = function(options) {
  this.host    = options.host;
  this.port    = options.port;
  this.headers = options.headers;
};

Client.prototype.get = function(path) {
  var options = this._buildOptions(path, 'GET');

  return new Thenable(function(resolve, reject) {
    var wrapper = {};
    var request = http.request(options, function(response) {
      response.setEncoding('utf8');

      response.on('data', function(chunk) {
        wrapper.body = JSON.parse(chunk);
      });

      response.on('end', function() {
        wrapper.status = response.statusCode;

        if (wrapper.status >= 200 && wrapper.status <= 399) {
          resolve(wrapper);
        } else {
          reject(new Error(errorMessages[wrapper.status]));
        }
      });
    });

    request.on('error', function(error) {
      reject(error);
    });

    request.end();
  });
};

Client.prototype._buildOptions = function(path, method) {
  return {
    hostname: this.host,
    port:     this.port,
    headers:  this.headers,
    path:     path,
    method:   method
  };
};

module.exports = Client;
