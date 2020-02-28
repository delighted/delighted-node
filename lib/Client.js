var http       = require('http');
var https      = require('https');
var url        = require('url');
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
  /**
   * Sends a GET request, returns a Thenable promise
   * @param path  URI to request. Can be a full or relative URL.
   * @param params
   * @returns Thenable
   */
  get: function(path, params) {
    var parsed = url.parse(path);
    var options;
    if (['http:', 'https:'].indexOf(parsed.protocol) >= 0) {
      options = this._buildOptionsFullUrl(parsed, 'GET');

    } else {
      var fullPath = this._fullPath(path, params);
      options = this._buildOptions(fullPath, 'GET');
    }

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
            status: response.statusCode,
            headers: response.headers,
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
            var extraProperties = {};
            var retryAfterHeader = response.headers['retry-after'];
            if (retryAfterHeader) {
              extraProperties.retryAfter = Number(retryAfterHeader);
            }
            const message = wrapper.body ? JSON.stringify(wrapper.body) : null;

            reject(errors(wrapper.status, message, extraProperties));
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
      headers:  this._cloneObject(this.headers),
      path:     this.base + path,
      method:   method
    };
  },

  _buildOptionsFullUrl: function(parsedUrl, method) {
    return {
      hostname: parsedUrl.hostname,
      port:     parsedUrl.port,
      headers:  this._cloneObject(this.headers),
      path:     parsedUrl.path,
      query:    parsedUrl.query,
      method:   method
    };
  },

  _insertContentLength: function(headers, data) {
    if (data) {
      var body = serializer.dump(data);
      headers['Content-Length'] = Buffer.byteLength(body, 'utf8');
    }
  },

  _cloneObject: function() {
    var target = {};

    for (var i = 0; i < arguments.length; i++) {
      var source = arguments[i];
      for (var name in source) {
        if (source.hasOwnProperty(name)) {
          target[name] = source[name];
        }
      }
    }

    return target;
  }
});

module.exports = Client;
