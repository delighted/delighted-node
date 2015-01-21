var extend = require('./utils/extend');
var merge  = require('./utils/merge');

function Resource(client) {
  this.client = client;
  this.schema = {};
}

Resource.extend = extend;

merge(Resource.prototype, {
  path: '',

  materialize: function(attributes) {
    var Constructor  = this.constructor;
    var materialized = new Constructor(this.client);

    for (var key in attributes) {
      materialized[key] = attributes[key];
      materialized.schema[key]  = true;
    }

    return materialized;
  },

  toJSON: function() {
    var attributes = {};

    for (var key in this.schema) {
      attributes[key] = this[key];
    }

    return attributes;
  },

  save: function() {
    return this.client.put(this.path, this).then(function(response) {
      return this.materialize(response.body);
    }.bind(this));
  },

  all: function(params) {
    return this.client.get(this.path, params).then(function(response) {
      return response.body.map(this.materialize, this);
    }.bind(this));
  },

  create: function(data) {
    return this.client.post(this.path, data).then(function(response) {
      return this.materialize(response.body);
    }.bind(this));
  },

  retrieve: function(id, params) {
    var path = this._composePath(id);

    return this.client.get(path, params).then(function(response) {
      return this.materialize(response.body);
    }.bind(this));
  },

  _composePath: function(id) {
    return id ? (this.path + '/' + id) : this.path;
  }
});

module.exports = Resource;
