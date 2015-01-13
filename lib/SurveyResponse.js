var merge    = require('./utils/merge');
var Thenable = require('./vendor/Thenable');

var SurveyResponse = function(attributes) {
  this.attributes = attributes;

  merge(this, attributes);
};

SurveyResponse.create = function(attributes) {
  var response = new SurveyResponse(attributes);

  return new Thenable(function(resolve) {
    resolve(response);
  });
};

SurveyResponse.retrieve = function(person) {
  var response = new SurveyResponse({ person: person });

  return new Thenable(function(resolve) {
    resolve(response);
  });
};

module.exports = SurveyResponse;
