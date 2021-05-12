var expect        = require('chai').expect;
var AutopilotConfiguration = require('../../../lib/resources/autopilot/Configuration');
var helper        = require('../../test_helper');

describe('AutopilotConfiguration', function() {
  var server;

  beforeEach(function() {
    server = helper.server(helper.port, helper.requests);
  });

  afterEach(function() {
    server.close();
  });

  describe('.retrieve', function() {
    it('retrieves a configuration', function() {
      var autopilotConfiguration = new AutopilotConfiguration(helper.client);

      return autopilotConfiguration.retrieve('email').then(function(response) {
        expect(response).to.exist;
        expect(response.platform_id).to.equal('email');
      });
    });
  });
});
