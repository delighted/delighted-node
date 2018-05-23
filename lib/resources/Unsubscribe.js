var Resource = require('../Resource');

module.exports = Resource.extend({
  path: '/unsubscribes'
}, { except: ['retrieve', 'save', 'delete'] });
