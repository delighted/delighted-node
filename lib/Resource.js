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

  delete: function(id_object) {
    var id = this._identifierString(id_object);
    var path = this._composePath(id);

    return this.client.delete(path).then(function(response) {
      return response.body;
    }.bind(this));
  },

  _composePath: function(id) {
    return id ? (this.path + '/' + encodeURIComponent(id)) : this.path;
  },

  _identifierString: function(id_object) {
    var identifier_key, identifier_value, identifier;

    for (var key in id_object) {
      if (key && id_object[key]) {
        identifier_key = key;
        identifier_value = id_object[key];
        break;
      }
    }

    if ("id" == identifier_key) {
      identifier = identifier_value
    } else if (identifier_key && identifier_value) {
      identifier = "" + identifier_key + ":" + identifier_value;
    }

    return identifier;
  }
});

module.exports = Resource;
