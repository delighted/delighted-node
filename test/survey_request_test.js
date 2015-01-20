var expect        = require('chai').expect;
var helper        = require('./test_helper');
var SurveyRequest = require('../lib/SurveyRequest');

describe('SurveyRequest', function() {
  var server;

  beforeEach(function() {
    server = helper.server(helper.port);
  });

  afterEach(function() {
    server.close();
  });

  describe('.deletePending', function() {
    it('deletes a pending survey request', function() {
      var survey = new SurveyRequest(helper.config);
      var params = { person_email: 'foo@example.com' };

      return survey.deletePending(params).then(function(response) {
        expect(response).to.exist;
      });
    });
  });
});
