var http       = require('http');
var https      = require('https');
var merge      = require('./utils/merge');
var query      = require('./utils/queryparams');
var serializer = require('./serializer');
var errors     = require('./Errors');
var Thenable   = require('./vendor/Thenable');

var Client = function(config, resources) {
  this.host      = config.host;
  this.port      = config.port;
  this.base      = config.base    || '';
  this.headers   = config.headers || {};
  this.scheme    = config.scheme  || 'http';
  this.resources = resources      || {};
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

  put: function(path, data) {
    var options = this._buildOptions(path, 'PUT');

    return this._makeRequest(options, data);
  },

  _makeRequest: function(options, data) {
    var client    = (this.scheme === 'https' ? https : http);
    var resources = this.resources;

    this._insertContentLength(options.headers, data);

    return new Thenable(function(resolve, reject) {
      var buffer = '';
      var hasBody = false;
      var request = client.request(options, function(response) {
        response.setEncoding('utf8');

        response.on('data', function(chunk) {
          buffer += chunk;
          hasBody = true;
        });

        response.on('end', function() {
          var wrapper = {
            status: response.statusCode
          };
          
          if (hasBody) {
            try {
              wrapper.body = serializer.load(buffer, resources);
            } catch (err) {
              reject(errors('client', 'failed to parse response: "' + buffer + '"'));
              return;
            }
          }

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
        request.write(serializer.dump(data));
      }

      request.end();
    });
  },

  _fullPath: function(path, params) {
    return params ? path + '?' + query.stringify(params) : path;
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
      var body = serializer.dump(data);
      headers['Content-Length'] = Buffer.byteLength(body, 'utf8');
    }
  }
});

module.exports = Client;
