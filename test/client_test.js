var expect     = require('chai').expect;
var fakeServer = require('./support/fake_server');
var Client     = require('../lib/Client');
var Thenable   = require('../lib/vendor/Thenable');

describe('Client', function() {
  var host = 'localhost';
  var port = 7654;
  var server;

  beforeEach(function() {
    server = fakeServer(port);
  });

  afterEach(function() {
    server.close();
  });

  describe('.get', function() {
    it('returns a promise wrapping the request', function() {
      var client  = new Client({ host: host, port: port });
      var promise = client.get('/fake');

      expect(promise).to.be.instanceof(Thenable);
    });

    it('resolves to a response object', function(done) {
      var client = new Client({ host: host, port: port });

      client.get('/fake').then(function(response) {
        expect(response.status).to.eq(200);
        expect(response.body).to.eql({ message: 'OK' });
        return done();
      });
    });

    it('rejects with custom errors', function(done) {
      var client = new Client({ host: host, port: port });

      client.get('/401').then(function(_) {
      }, function(error) {
        expect(error.message).to.match(/invalid api key/i);
        return done();
      });
    });
  });
});
