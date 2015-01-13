var expect      = require('chai').expect;
var Unsubscribe = require('../lib/unsubscribe');

describe('Unsubscribe', function() {
  describe('.create', function() {
    it('creates an unsubscribe', function(done) {
      var callback = function(unsubscribe) {
        expect(unsubscribe.person_email).to.eq('foo+test@example.com');
        done();
      }

      Unsubscribe.create({ person_email: 'foo+test@example.com' }, callback);
    });
  });
});
