var expect        = require('chai').expect;
var SurveyRequest = require('../lib/SurveyRequest');

describe('SurveyRequest', function() {
  describe('.deletePending', function() {
    it('deletes a pending survey request', function(done) {
      var params = { person_email: 'foo+test@example.com' };

      SurveyRequest.deletePending(params).then(function(request) {
        expect(request.person_email).to.eq('foo+test@example.com');
        return done();
      });
    });
  });
});
