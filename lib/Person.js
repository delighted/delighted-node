var merge = require('./utils/merge');

var Person = function(attributes) {
  this.attributes = attributes;

  merge(this, attributes);
};

Person.create = function(attributes, callback) {
  var person = new Person(attributes);

  callback(person);

  return person;
};

module.exports = Person;
