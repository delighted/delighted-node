var merge    = require('./utils/merge');
var Thenable = require('./vendor/thenable');

var SurveyRequest = function(attributes) {
  this.attributes = attributes;

  merge(this, attributes);
};

SurveyRequest.deletePending = function(attributes) {
  var request = new SurveyRequest(attributes);

  return new Thenable(function(resolve) {
    resolve(request);
  });
};

module.exports = SurveyRequest;
