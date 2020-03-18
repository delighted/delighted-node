var expect = require('chai').expect;
var Person = require('../../lib/resources/Person');
var helper = require('../test_helper');

describe('Person', function() {
  var server;

  beforeEach(function() {
    server = helper.server(helper.port, helper.requests);
  });

  afterEach(function() {
    server.close();
  });

  describe('#create', function() {
    it('creates a new person and saves it to the server', function() {
      var person = new Person(helper.client);
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

  describe('#save', function() {
    it('persists the person to the server', function() {
      var person = new Person(helper.client);
      var materialized = person.materialize({ email: 'foo@example.com' });

      materialized.name = 'Happy Person';

      return materialized.save().then(function(person) {
        expect(materialized.name).to.eq('Happy Person');
      });
    });
  });

  describe('#delete', function() {
    it('deletes a person by id', function () {
      var person = new Person(helper.client);
      return person.delete({ id: 42 }).then(function(response) {
        expect(response.ok).to.eq(true);
      });
    });

    it('deletes a person by email address', function () {
      var person = new Person(helper.client);
      return person.delete({ email: "foo@example.com" }).then(function(response) {
        expect(response.ok).to.eq(true);
      });
    });

    it('deletes a person by phone number', function () {
      var person = new Person(helper.client);
      return person.delete({ phone_number: "+14155551212" }).then(function(response) {
        expect(response.ok).to.eq(true);
      });
    });
  });

  describe('#list', function() {
    describe('.autoPagingEach', function() {
      it('calls our callback for each person', function () {
        var people = [];
        var person = new Person(helper.client);
        return person.list()
          .autoPagingEach(function(p) {
            people.push(p);
          })
          .then(function() {
            expect(people).to.have.length(3);
            expect(people[0].id).to.eq('123');
            expect(people[0].name).to.eq('foos');
            expect(people[0].email).to.eq('foo@example.com');
            expect(people[1].id).to.eq('456');
            expect(people[1].name).to.eq('ball');
            expect(people[1].email).to.eq('ball@example.com');
            expect(people[2].id).to.eq('789');
            expect(people[2].name).to.eq('win');
            expect(people[2].email).to.eq('goal@example.com');
          });
      });
    });
  });

  describe('#materialize', function() {
    it('creates a new instance with defined attributes', function() {
      var person = new Person(helper.client);
      var materialized = person.materialize({ email: 'foo@example.com' });

      expect(materialized).to.be.instanceof(Person);
      expect(materialized.email).to.eql('foo@example.com');
    });
  });

  describe('#toJSON', function() {
    it('returns all attributes', function() {
      var person = new Person(helper.client);
      var materialized = person.materialize({ email: 'foo@example.com' });

      expect(materialized.toJSON()).to.eql({ email: 'foo@example.com' });
    });
  });
});
