var expect = require('chai').expect;
var Person = require('../lib/Person');

describe('Person', function() {
  describe('#create', function() {
    it('creates a new person and saves it to the server', function(done) {
      var params = {
        email: 'foo+testing@example.com',
        name: 'Happy Person',
        delay: 60,
        properties: {
          customer_id: 123,
          country: 'USA',
          local: 'en',
          question_product_name: 'Classic Oxford'
        }
      }

      Person.create(params).then(function(person) {
        expect(person.email).to.eq('foo+testing@example.com');
        expect(person.delay).to.eq(60);
        expect(person.properties).to.exist;

        return done();
      });
    });
  });
});
