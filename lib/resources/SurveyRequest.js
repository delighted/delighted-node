var Resource = require('../Resource');

module.exports = Resource.extend({
  path: '/people/{person_email}/survey_requests/pending',

  deletePending: function(params) {
    var encodedEmail = encodeURIComponent(params.person_email);
    var path = this.path.replace('{person_email}', encodedEmail);

    return this.client.delete(path).then(function(response) {
      return response.body;
    });
  }
}, { except: ['all', 'create', 'retrieve', 'save'] });
