var extend = require('./utils/extend');
var merge  = require('./utils/merge');
var Client = require('./Client');

function Resource(config) {
  this.config = config;
  this.client = new Client(config);
}

Resource.extend = extend;

merge(Resource.prototype, {
  path: '',

  attributes: {},

  materialize: function(attributes) {
    var Constructor  = this.constructor;
    var materialized = new Constructor(this.config);

    materialized.attributes = attributes

    return materialized;
  },

  toJSON: function() {
    return this.attributes;
  },

  all: function(params) {
    return this.client.get(this.path, params).then(function(response) {
      return response.body;
    });
  },

  create: function(data) {
    return this.client.post(this.path, data).then(function(response) {
      return response.body;
    });
  },

  retrieve: function(id, params) {
    var path = this._composePath(id);

    return this.client.get(path, params).then(function(response) {
      return response.body;
    });
  },

  _composePath: function(id) {
    return id ? (this.path + '/' + id) : this.path;
  }
});

module.exports = Resource;
