var constants   = require('constants');
var http        = require('http');
var https       = require('https');
var querystring = require('querystring');
var merge       = require('./utils/merge');
var errors      = require('./errors');
var Thenable    = require('./vendor/Thenable');

var Client = function(options) {
  this.host    = options.host;
  this.port    = options.port;
  this.base    = options.base    || '';
  this.headers = options.headers || {};
  this.scheme  = options.scheme  || 'http';
};

merge(Client.prototype, {
  get: function(path, params) {
    var fullPath = this._fullPath(path, params);
    var options  = this._buildOptions(fullPath, 'GET');

    return this._makeRequest(options);
  },

  delete: function(path) {
    var options = this._buildOptions(path, 'DELETE');

    return this._makeRequest(options);
  },

  post: function(path, data) {
    var options = this._buildOptions(path, 'POST');

    return this._makeRequest(options, data);
  },

  _makeRequest: function(options, data) {
    var client = (this.scheme === 'https' ? https : http);

    this._insertContentLength(options.headers, data);

    return new Thenable(function(resolve, reject) {
      var wrapper = {};
      var request = client.request(options, function(response) {
        response.setEncoding('utf8');

        response.on('data', function(chunk) {
          try {
            wrapper.body = JSON.parse(chunk);
          } catch(error) {
            reject(error);
          }
        });

        response.on('end', function() {
          wrapper.status = response.statusCode;

          if (wrapper.status >= 200 && wrapper.status <= 399) {
            resolve(wrapper);
          } else {
            reject(errors(wrapper.status));
          }
        });
      });

      request.on('error', function(error) {
        reject(error);
      });

      if (data) {
        request.write(JSON.stringify(data));
      }

      request.end();
    });
  },

  _fullPath: function(path, params) {
    return params ? path + '?' + querystring.stringify(params) : path;
  },

  _buildOptions: function(path, method) {
    return {
      hostname: this.host,
      port:     this.port,
      headers:  this.headers,
      path:     this.base + path,
      method:   method
    };
  },

  _insertContentLength: function(headers, data) {
    if (data) {
      headers['Content-Length'] = JSON.stringify(data).length;
    }
  }
});

module.exports = Client;
