var expect    = require('chai').expect;
var Delighted = require('../lib/Delighted');

describe('delighted', function() {
  var apiKey = 'abcd1234';

  describe('.VERSION', function() {
    it('exposes the version on the constructor', function() {
      var delighted = new Delighted(apiKey);

      expect(delighted.VERSION).to.exist;
    });

    it('injects the version into the user agent header', function() {
      var delighted = new Delighted(apiKey);
      var headers = delighted.config.headers;

      expect(headers['User-Agent']).to.contain(delighted.VERSION);
    });
  });

  describe('resources', function() {
    it('defines an delighted of all resources', function() {
      var delighted = new Delighted(apiKey);

      expect(delighted).to.have.property('metrics');
      expect(delighted).to.have.property('person');
      expect(delighted).to.have.property('surveyRequest');
      expect(delighted).to.have.property('surveyResponse');
      expect(delighted).to.have.property('unsubscribe');
    });
  });

  describe('apiKey', function() {
    it('sets the encoded apiKey as the config.auth', function() {
      var delighted = new Delighted(apiKey);

      // 'abcd1234:' => 'YWJjZDEyMzQ6'

      expect(delighted.config).to.have.property('headers');
      expect(delighted.config.headers).to.have.property('Authorization');
      expect(delighted.config.headers['Authorization']).to.contain('Basic YWJjZDEyMzQ6');
    });
  });
});
