var expect        = require('chai').expect;
var SurveyRequest = require('../lib/SurveyRequest');

describe('SurveyRequest', function() {
  describe('.deletePending', function() {
    it('deletes a pending survey request', function(done) {
      var callback = function(request) {
        expect(request.person_email).to.eq('foo+test@example.com');
        done();
      }

      SurveyRequest.deletePending({
        person_email: 'foo+test@example.com'
      }, callback);
    });
  });
});
