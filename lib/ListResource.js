var merge           = require('./utils/merge');
var parseLinkHeader = require('./utils/parse_link_header');
var errors          = require('./Errors');
var Thenable        = require('./vendor/Thenable');

function ListResource(object, path, opts, client) {
  this.object = object;
  this.path = path;
  this.opts = opts;
  this.client = client;
  this.interation_count = 0;
  this.retries = 0;
  this.done = false;
}

var MAX_RETRIES_DEFAULT = 4;

merge(ListResource.prototype, {
  autoPagingEach: function(onItem, opts) {
    return new Thenable(function(resolve, reject) {
      this.auto_handle_rate_limits = ( !opts || opts.auto_handle_rate_limits === undefined ? true : opts.auto_handle_rate_limits );
      this.auto_handle_rate_limits_max_retries = ( !opts || opts.auto_handle_rate_limits_max_retries === undefined ? MAX_RETRIES_DEFAULT : opts.auto_handle_rate_limits_max_retries );
      this.auto_handle_rate_limits_callback = ( !opts || opts.auto_handle_rate_limits_callback === undefined ? true : opts.auto_handle_rate_limits_callback );
      if (this.done) {
        this._onError(errors('pagination', 'pagination completed'));
      }

      this._onDone = function() {
        resolve();
      };

      this._onError = function(error) {
        if (this.auto_handle_rate_limits && this.retries < this.auto_handle_rate_limits_max_retries) {
          this.retries++;
          setTimeout(this._getResponse.bind(this), error.retryAfter * 1000);
          this.auto_handle_rate_limits_callback(error.retryAfter);
        } else if (this.retries >= this.auto_handle_rate_limits_max_retries) {
          reject(errors('pagination', 'pagination maximum retries exceeded'));
        } else {
          reject(error);
        }
      };

      this._getResponse = function() {
        if (this.interation_count === 0) {
          this.client.get(this.path, this.opts)
            .then(this._onResponse.bind(this), this._onError.bind(this));
        } else {
          this.client.get(this.next_link)
            .then(this._onResponse.bind(this), this._onError.bind(this));
        }
      };

      this._onResponse = function (response) {
        // Reset retry count on successful response
        this.retries = 0;
        var list = response.body.map(this.object.materialize, this.object);
        for (var i in list) {
          if (onItem(list[i]) === false) {
            this._onDone();
            break;
          }
        }
        this.interation_count++;
        // Get next response if we have a next page
        this.next_link = parseLinkHeader(response.headers.link).next;
        if (this.next_link) {
          this._getResponse();
        } else {
          this.done = true;
          this._onDone();
        }
      };

      this._getResponse();
    }.bind(this));
  }
});

module.exports = ListResource;
