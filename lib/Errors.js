function constructError(name) {
  var DelightedError = function(message) {
    this.type    = name;
    this.message = message;
  };

  DelightedError.prototype = new Error();
  DelightedError.prototype.constructor = DelightedError;

  return DelightedError;
}

var errors = {
  '401': constructError('AuthenticationError'),
  '406': constructError('UnsupportedFormatRequestedError'),
  '422': constructError('ResourceValidationError'),
  '429': constructError('TooManyRequestsError'),
  '500': constructError('GeneralAPIError'),
  '503': constructError('ServiceUnavailableError'),
  'client': constructError('GeneralClientError')
};

module.exports = function(status, message, extraProperties) {
  var Constructor = errors[status] || errors['500'];
  var error = new Constructor(message);

  Object.keys(extraProperties || {}).forEach(function(key) {
    error[key] = extraProperties[key];
  });

  return error;
};
