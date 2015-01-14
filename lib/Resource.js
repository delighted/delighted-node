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

  retrieve: function() {
    return this.client.get(this.path).then(function(response) {
      return response.body;
    });
  }
});

module.exports = Resource;
