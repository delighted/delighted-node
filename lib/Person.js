var Person = function(attributes) {
  this.attributes = attributes;

  this._defineAccessors(attributes);
};

Person.create = function(attributes, callback) {
  var person = new Person(attributes);

  callback(person);

  return person;
};

Person.prototype._defineAccessors = function(accessors) {
  for (var prop in accessors) {
    this[prop] = accessors[prop];
  }
};

module.exports = Person;
