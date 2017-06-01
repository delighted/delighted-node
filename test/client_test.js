var expect   = require('chai').expect;
var helper   = require('./test_helper');
var Client   = require('../lib/Client');
var Thenable = require('../lib/vendor/Thenable');

describe('Client', function() {
  var server;

  beforeEach(function() {
    server = helper.server(helper.port, helper.requests);
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
        expect(error.type).to.eq('AuthenticationError');
        expect(error.message).to.eq(null);
      });
    });

    it('rejects with custom errors, including response body', function() {
      var client = new Client(helper.config);

      return client.get('/422').then(function(_) {
      }, function(error) {
        console.log('error', error);
        expect(error.type).to.eq('ResourceValidationError');
        expect(error.message).to.eql({ data: 'an error occurred' });
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

    it('does not modify client default headers', function() {
      var config = Object.assign(
        {}, helper.config, { headers: { 'User-Agent': 'header test' } }
      );
      var originalHeaders = Object.assign({}, config.headers);
      var client = new Client(config);

      return client.post('/201', { ok: true }).then(function(response) {
        expect(client.headers).to.eql(originalHeaders);
      });
    });
  });

  describe('#put', function() {
    it('sends a json encoded PUT request', function() {
      var client = new Client(helper.config);

      return client.put('/204', {}).then(function(response) {
        expect(response.status).to.eq(204);
      });
    });
  });

  describe('general response body handling', function() {
    it('succeeds when no response body', function() {
      var client = new Client(helper.config);

      return client.get('/no_body').then(function(response) {
        expect(response.status).to.eq(200);
        expect(response.body).to.eql(undefined);
      });
    });

    it('rejects invalid JSON response body', function() {
      var client = new Client(helper.config);

      return client.get('/invalid_json').then(function(_) {
        expect(false).to.be(true);
      }, function(error) {
        expect(error.type).to.eq('GeneralClientError');
      });
    });
  });
});
