var extend = require('./utils/extend');
var merge  = require('./utils/merge');
var ListResource = require('./ListResource');

function Resource(client) {
  this.client = client;
  this.schema = {};
}

Resource.extend = extend;

Resource.defaults = ['materialize', 'toJSON', 'getPath', '_composePath', '_identifierString']

merge(Resource.prototype, {
  path: '',

  getPath: function() {
    return this.path;
  },

  materialize: function(attributes) {
    var Constructor  = this.constructor;
    var materialized = new Constructor(this.client);

    for (var key in attributes) {
      materialized[key] = attributes[key];
      materialized.schema[key] = true;
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
    return this.client.put(this.getPath(), this).then(function(response) {
      return this.materialize(response.body);
    }.bind(this));
  },

  all: function(params) {
    return this.client.get(this.getPath(), params).then(function(response) {
      return response.body.map(this.materialize, this);
    }.bind(this));
  },

  list: function(params) {
    return new ListResource(this, this.getPath(), params, this.client);
  },

  create: function(data) {
    return this.client.post(this.getPath(), data).then(function(response) {
      return this.materialize(response.body);
    }.bind(this));
  },

  retrieve: function(id, params) {
    var path = this._composePath(id);

    return this.client.get(path, params).then(function(response) {
      return this.materialize(response.body);
    }.bind(this));
  },

  delete: function(id_object) {
    var id = this._identifierString(id_object);
    var path = this._composePath(id);

    return this.client.delete(path).then(function(response) {
      return response.body;
    }.bind(this));
  },

  _composePath: function(id) {
    return id ? (this.getPath() + '/' + encodeURIComponent(id)) : this.getPath();
  },

  _identifierString: function(identifier_object) {
    var keys, identifier_key, identifier_value, identifier;

    keys = Object.getOwnPropertyNames(identifier_object);
    if (keys.length != 1) {
      return;
    }

    identifier_key = keys[0];
    identifier_value = identifier_object[identifier_key];

    if ("id" == identifier_key.toString()) {
      identifier = identifier_value.toString();
    } else if (identifier_key && identifier_value) {
      identifier = "" + identifier_key + ":" + identifier_value;
    }

    return identifier;
  }
});

module.exports = Resource;
