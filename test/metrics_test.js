var expect     = require('chai').expect;
var Metrics    = require('../lib/Metrics');
var fakeServer = require('./support/fake_server');

describe('Metrics', function() {
  var host = 'localhost';
  var port = 7654;
  var server;

  beforeEach(function() {
    server = fakeServer(port);
  });

  afterEach(function() {
    server.close();
  });

  describe('.retrieve', function() {
    it('pulls down the current metrics', function(done) {
      var config  = { host: host, port: port };
      var metrics = new Metrics(config);

      metrics.retrieve().then(function(metrics) {
        expect(metrics.nps).to.eq(0);
        return done();
      });
    });
  });
});
