var expect        = require('chai').expect;
var AutopilotMembership = require('../../../lib/resources/autopilot/Membership');
var helper        = require('../../test_helper');

describe('AutopilotMembership', function() {
  var server;

  beforeEach(function() {
    server = helper.server(helper.port, helper.requests);
  });

  afterEach(function() {
    server.close();
  });

  describe('#all', function() {
    it('retrieves a list of people for Email', function() {
      var autopilotMembership = new AutopilotMembership(helper.client).forEmail();

      return autopilotMembership.all().then(function(response) {
        expect(response).to.exist;
        expect(response).to.have.length(2);
      });
    });

    it('retrieves a list of people for Sms', function() {
      var autopilotMembership = new AutopilotMembership(helper.client).forSms();

      return autopilotMembership.all().then(function(response) {
        expect(response).to.exist;
        expect(response).to.have.length(2);
      });
    });
  });

  describe('#create', function() {
    it('creates a new person', function() {
      var autopilotMembership = new AutopilotMembership(helper.client).forEmail();
      params = { person_email: 'person-1@example.com' };

      return autopilotMembership.create(params).then(function(response) {
        expect(response).to.exist;
        expect(response.person.email).to.equal('person-1@example.com');
      });
    });
  });

  describe('#delete', function() {
    it('deletes a person', function() {
      var autopilotMembership = new AutopilotMembership(helper.client).forEmail();
      params = { person_email: 'person-1@example.com' };

      return autopilotMembership.delete(params).then(function(response) {
        expect(response).to.exist;
        expect(response.person.email).to.equal('person-1@example.com');
      });
    });
  });
});
