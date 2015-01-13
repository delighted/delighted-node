var expect      = require('chai').expect;
var Unsubscribe = require('../lib/unsubscribe');

describe('Unsubscribe', function() {
  describe('.create', function() {
    it('creates an unsubscribe', function(done) {
      var params = { person_email: 'foo+test@example.com' };

      Unsubscribe.create(params).then(function(unsubscribe) {
        expect(unsubscribe.person_email).to.eq('foo+test@example.com');
        return done();
      });;
    });
  });
});
