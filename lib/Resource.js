var extend = require('./utils/extend');
var merge  = require('./utils/merge');
var Client = require('./Client');

function Resource(delighted) {
  this.delighted = delighted;
  this.client    = new Client(delighted);

  this.initialize.apply(this, arguments);
};

Resource.extend = extend;

merge(Resource.prototype, {
  path: '',

  initialize: function() {},

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

    return this.client.get(this.path, params).then(function(response) {
      return response.body;
    });
  },

  _composePath: function(id) {
    id ? (this.path + '/' + id) : this.path;
  }
});

module.exports = Resource;
