var Resource = require('../Resource');

module.exports = Resource.extend({
  path: '/survey_responses'
}, { only: Resource.defaults.concat(['all', 'create', 'retrieve', 'save']) });
