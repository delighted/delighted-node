var Resource = require('../Resource');

module.exports = Resource.extend({
  path: '/people'
}, { only: Resource.defaults.concat(['create', 'delete', 'list', 'retrieve', 'save']) });
