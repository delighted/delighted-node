var merge    = require('./utils/merge');
var Client   = require('./Client');
var Thenable = require('./vendor/Thenable');

function Metrics(attributes) {
  this.attributes = attributes;

  merge(this, attributes);
};

Metrics.retrieve = function() {
  var metrics = new Metrics();
  var client  = new Client();

  return client.get('/v1/metrics.json').then(function(response) {
    return new Metrics(response.body);
  });
};

Object.defineProperties(Metrics.prototype, {
  'nps':               { value: 0, writable: true, enumerable: true },
  'promoter_count':    { value: 0, writable: true, enumerable: true },
  'promoter_percent':  { value: 0, writable: true, enumerable: true },
  'passive_count':     { value: 0, writable: true, enumerable: true },
  'passive_percent':   { value: 0, writable: true, enumerable: true },
  'detractor_count':   { value: 0, writable: true, enumerable: true },
  'detractor_percent': { value: 0, writable: true, enumerable: true },
  'response_count':    { value: 0, writable: true, enumerable: true }
});

module.exports = Metrics;
