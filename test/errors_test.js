var expect = require('chai').expect;
var errors = require('../lib/Errors');

describe('Errors', function() {
  it('maps status codes to custom errors', function() {
    var unauthorized = errors('401');
    expect(unauthorized.name).to.eq('Error');
    expect(unauthorized.type).to.eq('AuthenticationError');
    expect(unauthorized.message).to.eq(undefined);
    expect(unauthorized.stack).to.be.a('string');

    var unacceptable = errors('406', 'foo');
    expect(unauthorized.name).to.eq('Error');
    expect(unacceptable.type).to.eq('UnsupportedFormatRequestedError');
    expect(unacceptable.message).to.eq('foo');
    expect(unauthorized.stack).to.be.a('string');
  });
});
