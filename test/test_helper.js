var fakeServer = require('./support/fake_server');
var Client     = require('../lib/Client');

module.exports = {
  host: 'localhost',
  port: 7654,
  server: fakeServer,

  config: {
    host: 'localhost',
    port: 7654
  },

  client: new Client({
    host: 'localhost',
    port: 7654
  })
}
