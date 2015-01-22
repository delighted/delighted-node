var expect        = require('chai').expect;
var SurveyRequest = require('../../lib/resources/SurveyRequest');
var helper        = require('../test_helper');

describe('SurveyRequest', function() {
  var server;

  beforeEach(function() {
    server = helper.server(helper.port, helper.requests);
  });

  afterEach(function() {
    server.close();
  });

  describe('.deletePending', function() {
    it('deletes a pending survey request', function() {
      var survey = new SurveyRequest(helper.client);
      var params = { person_email: 'foo@example.com' };

      return survey.deletePending(params).then(function(response) {
        expect(response).to.exist;
      });
    });
  });
});
