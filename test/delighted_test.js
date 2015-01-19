var expect    = require('chai').expect;
var delighted = require('../lib/delighted');

describe('delighted', function() {
  var apiKey = 'abcd1234';

  describe('.VERSION', function() {
    it('exposes the version on the constructor', function() {
      var instance = delighted(apiKey);

      expect(instance.VERSION).to.exist;
    });

    it('injects the version into the user agent header', function() {
      var instance = delighted(apiKey);
      var headers  = instance.config.headers;

      expect(headers['User-Agent']).to.contain(instance.VERSION);
    });
  });

  describe('resources', function() {
    it('defines an instance of all resources', function() {
      var instance = delighted(apiKey);

      expect(instance).to.have.property('metrics');
      expect(instance).to.have.property('person');
      expect(instance).to.have.property('surveyRequest');
      expect(instance).to.have.property('surveyResponse');
      expect(instance).to.have.property('unsubscribe');
    });
  });

  describe('apiKey', function() {
    it('sets the encoded apiKey as the config.auth', function() {
      var instance = delighted(apiKey);

      // 'abcd1234:' => 'YWJjZDEyMzQ6'

      expect(instance.config).to.have.property('headers');
      expect(instance.config.headers).to.have.property('Authorization');
      expect(instance.config.headers['Authorization']).to.contain('Basic YWJjZDEyMzQ6');
    });
  });
});
