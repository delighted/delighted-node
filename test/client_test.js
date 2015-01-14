var expect   = require('chai').expect;
var helper   = require('./test_helper');
var Client   = require('../lib/Client');
var Thenable = require('../lib/vendor/Thenable');

describe('Client', function() {
  var server;

  beforeEach(function() {
    server = helper.server(helper.port);
  });

  afterEach(function() {
    server.close();
  });

  describe('.get', function() {
    it('returns a promise wrapping the request', function() {
      var client  = new Client(helper.config);
      var promise = client.get('/fake');

      expect(promise).to.be.instanceof(Thenable);
    });

    it('resolves to a response object', function() {
      var client = new Client(helper.config);

      return client.get('/fake').then(function(response) {
        expect(response.status).to.eq(200);
        expect(response.body).to.eql({ message: 'OK' });
      });
    });

    it('appends query parameters', function() {
      var client = new Client(helper.config);

      return client.get('/fake', { per_page: 20, page: 10 }).then(function(response) {
        expect(response.body).to.eql({ message: 'ALRIGHT' });
      });
    });

    it('rejects with custom errors', function() {
      var client = new Client(helper.config);

      return client.get('/401').then(function(_) {
      }, function(error) {
        expect(error.message).to.match(/invalid api key/i);
      });
    });
  });

  describe('#post', function() {
    it('sends a json encoded payload', function() {
      var client = new Client(helper.config);

      return client.post('/201', { ok: true }).then(function(response) {
        expect(response.status).to.eq(201);
        expect(response.body).to.eql({ ok: true });
      });
    });
  });
});
