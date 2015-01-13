var merge = require('./utils/merge');

var SurveyResponse = function(attributes) {
  this.attributes = attributes;

  merge(this, attributes);
};

SurveyResponse.create = function(attributes, callback) {
  var response = new SurveyResponse(attributes);

  callback(response);

  return response;
};

SurveyResponse.retrieve = function(person, callback) {
  var response = new SurveyResponse({ person: person });

  callback(response);

  return response;
};

module.exports = SurveyResponse;
