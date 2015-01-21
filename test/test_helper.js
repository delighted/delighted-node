var server = require('./support/server');
var Client = require('../lib/Client');

var requests = {
  '/fake': {
    status: 200,
    body: { message: 'OK' }
  },

  '/fake?per_page=20&page=10': {
    status: 200,
    body: { message: 'ALRIGHT' }
  },

  '/201': {
    status: 201,
    body: { ok: true }
  },

  '/204': {
    status: 204,
    body: null
  },

  '/401':  {
    status: 401,
    body: null
  },

  '/metrics': {
    status: 200,
    body: { nps: 0 }
  },

  '/metrics?since=1424381340000': {
    status: 200,
    body: { nps: 10 }
  },

  '/people': {
    status: 201,
    body: { email: 'foo@example.com' }
  },

  '/people/foo%40example.com/survey_requests/pending': {
    status: 200,
    body: { ok: true }
  },

  '/survey_responses': {
    status: 201,
    body: { person: '321' }
  },

  '/survey_responses/321': {
    status: 200,
    body: { person: '321' }
  },

  '/survey_responses?order=desc': {
    status: 200,
    body: [{ id: 1 }, { id: 2 }]
  },

  '/unsubscribes': {
    status: 201,
    body: { person_email: 'foo@example.com' }
  }
};

var host = 'localhost';
var port = 7654;

module.exports = {
  port:     port,
  requests: requests,
  server:   server,

  config: {
    host: host,
    port: port
  },

  client: new Client({
    host: host,
    port: port
  })
}
