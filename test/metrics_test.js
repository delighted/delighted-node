var expect  = require('chai').expect;
var Metrics = require('../lib/Metrics');
var helper  = require('./test_helper');

describe('Metrics', function() {
  var server;

  beforeEach(function() {
    server = helper.server(helper.port);
  });

  afterEach(function() {
    server.close();
  });

  describe('.retrieve', function() {
    it('pulls down the current metrics', function(done) {
      var metrics = new Metrics(helper.config);

      metrics.retrieve().then(function(metrics) {
        expect(metrics.nps).to.eq(0);
        return done();
      });
    });
  });
});
