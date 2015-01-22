var expect      = require('chai').expect;
var Unsubscribe = require('../../lib/resources/unsubscribe');
var helper      = require('../test_helper');

describe('Unsubscribe', function() {
  var server;

  beforeEach(function() {
    server = helper.server(helper.port, helper.requests);
  });

  afterEach(function() {
    server.close();
  });

  describe('#create', function() {
    it('creates an unsubscribe', function() {
      var unsubscribe = new Unsubscribe(helper.client);
      var params = { person_email: 'foo@example.com' };

      return unsubscribe.create(params).then(function(response) {
        expect(response.person_email).to.eq('foo@example.com');
      });;
    });
  });
});
