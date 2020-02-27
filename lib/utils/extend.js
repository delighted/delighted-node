var merge = require('./merge');

function maskedPrototype(proto, only) {
  var masked = {};

  for (var key in proto) {
    if (only.indexOf(key) !== -1) {
      masked[key] = proto[key];
    }
  }

  return masked;
}

module.exports = function(protoProps, options) {
  var parent     = this;
  var only = (options || {}).only || [];
  var Surrogate;

  var child = function() { return parent.apply(this, arguments); };

  merge(child, parent);

  Surrogate = function () { this.constructor = child; };
  Surrogate.prototype = maskedPrototype(parent.prototype, only);
  child.prototype     = new Surrogate();

  if (protoProps) {
    merge(child.prototype, protoProps);
  }

  return child;
};
