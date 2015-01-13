var merge    = require('./utils/merge');
var Thenable = require('./vendor/thenable');

var Person = function(attributes) {
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
