var Resource = require('../Resource');

module.exports = Resource.extend({
  path: '/bounces'
}, { except: ['create', 'retrieve', 'save', 'delete'] });
