var expect         = require('chai').expect;
var SurveyResponse = require('../lib/SurveyResponse');

describe('SurveyResponse', function() {
  describe('.create', function() {
    it('creates a new survey response', function(done) {
      var params = { person: 321, score: 10 };

      SurveyResponse.create(params).then(function(response) {
        expect(response.person).to.eq(321);
        expect(response.score).to.eq(10);
        return done();
      });
    });
  });

  describe('.retrieve', function() {
    it('retrieves a specific response', function(done) {
      SurveyResponse.retrieve(321).then(function(response) {
        expect(response.person).to.eq(321);
        return done();
      });
    });
  });

  // describe('#all')
  // describe('#save')
  // describe('#score=')
  // describe('#person_properties')
});
