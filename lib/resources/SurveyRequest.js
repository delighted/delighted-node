var Resource = require('../Resource');

module.exports = Resource.extend({
  path: '/people/{person_email}/survey_requests',

  deletePending: function(params) {
    var encodedEmail = encodeURIComponent(params.person_email);
    var customPath   = this.path.replace('{person_email}', encodedEmail);
    var pendingPath  = customPath + '/pending';

    return this.client.delete(pendingPath).then(function(response) {
      return response.body;
    });
  }
}, {});
