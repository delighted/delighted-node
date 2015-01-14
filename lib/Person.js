var merge    = require('./utils/merge');
var Thenable = require('./vendor/Thenable');

function Person(attributes) {
  this.attributes = attributes;

  merge(this, attributes);
};

Person.create = function(attributes) {
  var person = new Person(attributes);

  return new Thenable(function(resolve) {
    resolve(person);
  });
};

module.exports = Person;
