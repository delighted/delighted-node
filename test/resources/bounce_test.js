var expect      = require('chai').expect;
var Bounce      = require('../../lib/resources/Bounce');
var helper      = require('../test_helper');

describe('Bounce', function() {
  var server;

  beforeEach(function() {
    server = helper.server(helper.port, helper.requests);
  });

  afterEach(function() {
    server.close();
  });

  describe('#all', function() {
    it('retrieves all bounces', function() {
      var bounce = new Bounce(helper.client);

      return bounce.all().then(function(response) {
        expect(response).to.have.length(2);
      });
    });
  });
});
