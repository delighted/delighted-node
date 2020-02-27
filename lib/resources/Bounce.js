var Resource = require('../Resource');

module.exports = Resource.extend({
  path: '/bounces'
}, { only: Resource.defaults.concat(['all']) });
