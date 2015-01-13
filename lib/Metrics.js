var merge    = require('./utils/merge');
var Thenable = require('./vendor/Thenable');

var Metrics = function(attributes) {
  this.attributes = attributes;

  merge(this, attributes);
};

Metrics.retrieve = function() {
  var metrics = new Metrics();

  return new Thenable(function(resolve) {
    resolve(metrics);
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
