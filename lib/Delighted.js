var merge  = require('./utils/merge');
var Client = require('./Client');

var VERSION         = '1.2.0';
var DEFAULT_HOST    = 'api.delighted.com';
var DEFAULT_PORT    = 443;
var DEFAULT_BASE    = '/v1';
var DEFAULT_HEADERS = {
  'Accept':       'application/json',
  'Content-Type': 'application/json'
};

var resources = {
  'bounce':         require('./resources/Bounce'),
  'metrics':        require('./resources/Metrics'),
  'person':         require('./resources/Person'),
  'surveyRequest':  require('./resources/SurveyRequest'),
  'surveyResponse': require('./resources/SurveyResponse'),
  'unsubscribe':    require('./resources/Unsubscribe')
};

function Delighted(key, options) {
  options = (options || {});

  this.config = {
    host:    options.host    || DEFAULT_HOST,
    port:    options.port    || DEFAULT_PORT,
    base:    options.base    || DEFAULT_BASE,
    headers: options.headers || DEFAULT_HEADERS,
    scheme:  options.scheme  || 'https'
  };

  this._injectAuthorization(key, this.config.headers);
  this._injectUserAgent(this.config.headers);
  this._defineResources();
}

merge(Delighted.prototype, {
  VERSION: VERSION,

  _injectUserAgent: function(headers) {
    headers['User-Agent'] = 'Delighted Node Client ' + VERSION;
  },

  _injectAuthorization: function(key, headers) {
    var base64Encoded = new Buffer(key + ':').toString('base64');

    headers.Authorization = 'Basic ' + base64Encoded;
  },

  _defineResources: function() {
    var instances = {};
    var client = new Client(this.config, instances);

    for (var name in resources) {
      var Constructor = resources[name];
      this[name]      = new Constructor(client);
      instances[name] = this[name];
    }
  }
});

module.exports = Delighted;
