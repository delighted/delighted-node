var expect        = require('chai').expect;
var AutopilotPerson = require('../../../lib/resources/autopilot/Person');
var helper        = require('../../test_helper');

describe('AutopilotPerson', function() {
  var server;

  beforeEach(function() {
    server = helper.server(helper.port, helper.requests);
  });

  afterEach(function() {
    server.close();
  });

  describe('#all', function() {
    it('retrieves a list of people', function() {
      var autopilotConfiguration = new AutopilotPerson(helper.client).forPlatform('email');

      return autopilotConfiguration.all().then(function(response) {
        expect(response).to.exist;
        expect(response).to.have.length(2);
      });
    });
  });

  describe('#create', function() {
    it('creates a new person', function() {
      var autopilotConfiguration = new AutopilotPerson(helper.client).forPlatform('email');
      params = { person_email: 'person-1@example.com' };

      return autopilotConfiguration.create(params).then(function(response) {
        expect(response).to.exist;
        expect(response.person.email).to.equal('person-1@example.com');
      });
    });
  });

  describe('#delete', function() {
    it('deletes a person', function() {
      var autopilotConfiguration = new AutopilotPerson(helper.client).forPlatform('email');
      params = { person_email: 'person-1@example.com' };

      return autopilotConfiguration.delete(params).then(function(response) {
        expect(response).to.exist;
        expect(response.person.email).to.equal('person-1@example.com');
      });
    });
  });
});
