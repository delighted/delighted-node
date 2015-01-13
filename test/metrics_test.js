var expect  = require('chai').expect;
var Metrics = require('../lib/Metrics');

describe('Metrics', function() {
  describe('.retrieve', function() {
    it('pulls down the current metrics', function(done) {
      Metrics.retrieve().then(function(metrics) {
        expect(metrics.nps).to.exist;
        return done();
      });
    });
  });

  describe('properties', function() {
    it('pre-defines response properties', function() {
      var metrics = new Metrics();

      expect(metrics).to.have.property('nps');
      expect(metrics).to.have.property('passive_count');
      expect(metrics).to.have.property('response_count');
    });
  });
});
