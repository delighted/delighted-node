var expect = require('chai').expect;
var query = require('../../lib/utils/queryparams');

describe('queryparams', function() {
  describe('.stringify', function() {
    it('converts dates to integers', function() {
      var params = { since: new Date() };
      var dumped = query.stringify(params);

      expect(dumped).to.match(/since=\d+/);
    });

    it('limits converted dates to second resolution', function() {
      var params = { since: new Date() };
      var dumped = query.stringify(params);

      expect(dumped).to.match(/=\d{10}$/);
    });
  });
});
