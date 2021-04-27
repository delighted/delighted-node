var Resource = require('../../Resource');
var queryparams = require('../../utils/queryparams')

module.exports = Resource.extend({
  path: '/autopilot/{platform}/memberships',

  validAutopilotPlatforms: ['sms', 'email'],

  platform: '',

  forPlatform: function(platform) {
    if (!this.validAutopilotPlatforms.includes(platform)) {
      throw Error(`Platform ${platform} is not a valid Autopilot platform`)
    }

    this.platform = platform;
    return this;
  },

  getPath: function() {
    if (this.platform == '') {
      throw Error('Platform has not been set; use the `forPlatform()` method');
    }

    return this.path.replace('{platform}', this.platform);
  },

  delete: function(params) {
    return this.client.delete(this.getPath() + '?' + queryparams.stringify(params)).then(function(response) {
      return response.body;
    }.bind(this));
  }
}, { only: Resource.defaults.concat(['all', 'create', 'delete']) });
