var expect  = require('chai').expect;
var Metrics = require('../../lib/resources/Metrics');
var helper  = require('../test_helper');

describe('Metrics', function() {
  var server;

  beforeEach(function() {
    server = helper.server(helper.port, helper.requests);
  });

  afterEach(function() {
    server.close();
  });

  describe('.retrieve', function() {
    it('pulls down the current metrics', function() {
      var metrics = new Metrics(helper.client);

      return metrics.retrieve().then(function(metrics) {
        expect(metrics.nps).to.eq(0);
      });
    });

    it('encodes time ranges', function() {
      var metrics = new Metrics(helper.client);
      var since   = new Date(2015, 1, 19, 15, 29, 00, 00);

      return metrics.retrieve({ since: since }).then(function(metrics) {
        expect(metrics.nps).to.eq(10);
      });
    });
  });
});
