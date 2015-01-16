var expect = require('chai').expect;
var errors = require('../lib/errors');

describe('Errors', function() {
  it('maps status codes to custom errors', function() {
    var unauthorized = errors('401');
    expect(unauthorized.type).to.eq('AuthenticationError');

    var unacceptable = errors('406');
    expect(unacceptable.type).to.eq('UnsupportedFormatRequestedError');
  });
});
