var expect         = require('chai').expect;
var SurveyResponse = require('../../lib/resources/SurveyResponse');
var helper         = require('../test_helper');

describe('SurveyResponse', function() {
  var server;

  beforeEach(function() {
    server = helper.server(helper.port, helper.requests);
  });

  afterEach(function() {
    server.close();
  });

  describe('#create', function() {
    it('creates a new survey response', function() {
      var survey = new SurveyResponse(helper.client);
      var params = { person: '321' };

      return survey.create(params).then(function(response) {
        expect(response.person).to.eq('321');
      });
    });
  });

  describe('#retrieve', function() {
    it('retrieves a specific response', function() {
      var survey = new SurveyResponse(helper.client);

      return survey.retrieve('321').then(function(response) {
        expect(response.person).to.eq('321');
      });
    });
  });

  describe('#all', function() {
    it('retrieves multiple responses', function() {
      var survey = new SurveyResponse(helper.client);

      return survey.all({ order: 'desc' }).then(function(response) {
        expect(response).to.have.length(2);
      });
    });
  });
});
