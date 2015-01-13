var merge    = require('./utils/merge');
var Thenable = require('./vendor/thenable');

var Unsubscribe = function(attributes) {
  this.attributes = attributes;

  merge(this, attributes);
};

Unsubscribe.create = function(attributes) {
  var unsubscribe = new Unsubscribe(attributes);

  return new Thenable(function(resolve) {
    resolve(unsubscribe);
  });
};

module.exports = Unsubscribe;
