function constructError(name) {
  var DelightedError = function(message) {
    this.type    = name;
    this.message = message;
  };

  DelightedError.prototype = new Error();
  DelightedError.prototype.constructor = DelightedError;

  return DelightedError;
};

var errors = {
  '401': constructError('AuthenticationError'),
  '406': constructError('UnsupportedFormatRequestedError'),
  '422': constructError('ResourceValidationError'),
  '500': constructError('GeneralAPIError'),
  '503': constructError('ServiceUnavailableError')
}

module.exports = function(status, message) {
  var Constructor = errors[status] || errors['500'];

  return new Constructor(message);
};
