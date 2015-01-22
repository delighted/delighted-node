var Resource = require('../Resource');

module.exports = Resource.extend({
  path: '/people/{person_email}/survey_requests/pending',

  deletePending: function(params) {
    var encoded  = encodeURIComponent(params.person_email);
    var replaced = this.path.replace('{person_email}', encoded);

    return this.client.delete(replaced).then(function(response) {
      return response.body;
    });
  }
});
