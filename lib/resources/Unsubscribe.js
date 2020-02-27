var Resource = require('../Resource');

module.exports = Resource.extend({
  path: '/unsubscribes'
}, { only: Resource.defaults.concat(['all', 'create']) });
