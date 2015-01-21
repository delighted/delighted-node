var expect  = require('chai').expect;
var adapter = require('../lib/adapter');
var Person  = require('../lib/Person');

describe('adapter', function() {
  var resources = {
    'person': new Person({})
  };

  describe('#load', function() {
    it('materializes known objects into resources', function() {
      var payload = JSON.stringify({
        id: '12345',
        person: {
          id: '1234',
          email: 'foo@example.com',
          name: 'Foo Example'
        }
      });

      var loaded = adapter.load(payload, resources);

      expect(loaded.person).to.be.instanceof(Person);
    });

    it('materializes recursively', function() {
      var payload = JSON.stringify([
        { person: { id: '123' }},
        { person: { id: '345' }}
      ]);

      var loaded = adapter.load(payload, resources);

      expect(loaded).to.have.length(2);
      expect(loaded[0].person).to.be.instanceof(Person);
      expect(loaded[1].person).to.be.instanceof(Person);
    });

    it('does not materialize non-objects', function() {
      var payload = JSON.stringify({
        person: '123'
      });

      var loaded = adapter.load(payload);

      expect(loaded.person).to.eq('123');
    });
  });
});
