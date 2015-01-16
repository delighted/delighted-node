var merge = require('./merge');

module.exports = function(protoProps) {
  var parent = this;
  var child, Surrogate;

  child = function() { return parent.apply(this, arguments); };

  merge(child, parent);

  Surrogate = function () { this.constructor = child; };
  Surrogate.prototype = parent.prototype;
  child.prototype     = new Surrogate();

  if (protoProps) {
    merge(child.prototype, protoProps);
  }

  return child;
};
