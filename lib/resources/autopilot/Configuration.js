var Resource = require('../../Resource');

module.exports = Resource.extend({
  path: '/autopilot'
}, { only: Resource.defaults.concat(['retrieve']) });
