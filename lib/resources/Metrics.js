var Resource = require('../Resource');

module.exports = Resource.extend({
  path: '/metrics',

  retrieve: function(params) {
    var _super = Resource.prototype.retrieve;

    return _super.call(this, null, params);
  }
});
