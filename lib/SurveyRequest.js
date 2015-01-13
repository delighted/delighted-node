var merge = require('./utils/merge');

var SurveyRequest = function(attributes) {
  this.attributes = attributes;

  merge(this, attributes);
};

SurveyRequest.deletePending = function(attributes, callback) {
  var request = new SurveyRequest(attributes);

  callback(request);

  return request;
};

module.exports = SurveyRequest;
