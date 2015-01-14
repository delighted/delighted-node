var expect = require('chai').expect;
var Person = require('../lib/Person');
var helper = require('./test_helper');

describe('Person', function() {
  var server;

  beforeEach(function() {
    server = helper.server(helper.port);
  });

  afterEach(function() {
    server.close();
  });

  describe('#create', function() {
    it('creates a new person and saves it to the server', function() {
      var person = new Person(helper.config);
      var params = {
        email: 'foo@example.com',
        name: 'Happy Person',
        delay: 60
      }

      return person.create(params).then(function(person) {
        expect(person.email).to.eq('foo@example.com');
      });
    });
  });
});
