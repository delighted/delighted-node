var merge = require('./utils/merge');

var Unsubscribe = function(attributes) {
  this.attributes = attributes;

  merge(this, attributes);
};

Unsubscribe.create = function(attributes, callback) {
  var unsubscribe = new Unsubscribe(attributes);

  callback(unsubscribe);

  return unsubscribe;
};

module.exports = Unsubscribe;
