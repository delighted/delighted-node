var Resource = require('../../Resource');
var queryparams = require('../../utils/queryparams')

var AutopilotResource = Resource.extend({
  path: '/autopilot/{platform}/memberships',

  getPath: function() {
    return this.path;
  },

  delete: function(params) {
    return this.client.delete(this.getPath() + '?' + queryparams.stringify(params)).then(function(response) {
      return response.body;
    }.bind(this));
  }
}, { only: Resource.defaults.concat(['list', 'create', 'delete']) });

var MembershipForSms = AutopilotResource.extend({
  path: '/autopilot/sms/memberships',
}, { only: Resource.defaults.concat(['list', 'create', 'delete']) });

var MembershipForEmail = AutopilotResource.extend({
  path: '/autopilot/email/memberships',
}, { only: Resource.defaults.concat(['list', 'create', 'delete']) });

module.exports = AutopilotResource.extend({
  forSms: function() {
    return new MembershipForSms(this.client);
  },

  forEmail: function() {
    return new MembershipForEmail(this.client);
  },
});
