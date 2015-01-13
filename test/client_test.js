var expect   = require('chai').expect;
var Client   = require('../lib/Client');
var Thenable = require('../lib/vendor/Thenable');

describe('Client', function() {
  describe('.get', function() {
    it('returns a promise wrapping the request', function() {
      var client  = new Client({ host: 'localhost', port: 22 });
      var promise = client.get('/fake');

      expect(promise).to.be.instanceof(Thenable);
    });
  });
});
