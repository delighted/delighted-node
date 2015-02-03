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
      var since   = new Date(Date.UTC(2015, 1, 19, 15, 29, 0, 0));

      return metrics.retrieve({ since: since }).then(function(metrics) {
        expect(metrics.nps).to.eq(10);
      });
    });
  });

  describe('extraneous methods', function() {
    it('does not inherit unused methods', function() {
      var metrics = new Metrics({});

      expect(metrics).not.to.have.property('all');
      expect(metrics).not.to.have.property('create');
      expect(metrics).not.to.have.property('save');
    });
  });
});
