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

  describe('#materialize', function() {
    it('creates a new instance with defined attributes', function() {
      var person = new Person(helper.config);
      var materialized = person.materialize({ email: 'foo@example.com' });

      expect(materialized).to.be.instanceof(Person);
      expect(materialized.attributes).to.eql({ email: 'foo@example.com' });
    });
  });

  describe('#toJSON', function() {
    it('returns all attributes', function() {
      var person = new Person(helper.config);
      person.attributes = { email: 'foo@example.com' };

      expect(person.toJSON()).to.eql(person.attributes);
    });
  });
});
