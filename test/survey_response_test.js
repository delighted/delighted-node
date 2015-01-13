var expect         = require('chai').expect;
var SurveyResponse = require('../lib/SurveyResponse');

describe('SurveyResponse', function() {
  describe('.create', function() {
    it('creates a new survey response', function(done) {
      var callback = function(response) {
        expect(response.person).to.eq(321);
        expect(response.score).to.eq(10);
        done();
      }

      SurveyResponse.create({ person: 321, score: 10 }, callback);
    });
  });

  describe('.retrieve', function() {
    it('retrieves a specific response', function(done) {
      var callback = function(response) {
        expect(response.person).to.eq(321);
        done();
      }

      SurveyResponse.retrieve(321, callback);
    });
  });


  // describe('#all')
  // describe('#save')
  // describe('#score=')
  // describe('#person_properties')
});
