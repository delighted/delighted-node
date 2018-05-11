var server = require('./support/server');
var Client = require('../lib/Client');

var requests = {
  'GET /fake': {
    status: 200,
    body: { message: 'OK' }
  },

  'GET /fake?per_page=20&page=10': {
    status: 200,
    body: { message: 'ALRIGHT' }
  },

  'POST /201': {
    status: 201,
    body: { ok: true }
  },

  'PUT /204': {
    status: 204,
    body: null
  },

  'GET /401':  {
    status: 401,
    body: null
  },

  'GET /422':  {
    status: 422,
    body: { data: "an error occurred" }
  },

  'GET /429':  {
    status: 429,
    body: null,
    headers: {
      'Retry-After': '5'
    }
  },

  'GET /metrics': {
    status: 200,
    body: { nps: 0 }
  },

  'GET /metrics?since=1424359740': {
    status: 200,
    body: { nps: 10 }
  },

  'POST /people': {
    status: 201,
    body: { email: 'foo@example.com' }
  },

  'PUT /people': {
    status: 201,
    body: { email: 'foo@example.com' }
  },

  'DELETE /people/42': {
    status: 202,
    body: { ok: true }
  },

  'DELETE /people/email:foo@example.com': {
    status: 202,
    body: { ok: true }
  },

  'DELETE /people/phone_number:+14155551212': {
    status: 202,
    body: { ok: true }
  },

  'DELETE /people/foo%40example.com/survey_requests/pending': {
    status: 200,
    body: { ok: true }
  },

  'POST /survey_responses': {
    status: 201,
    body: { person: '321' }
  },

  'GET /survey_responses/321': {
    status: 200,
    body: { person: '321' }
  },

  'GET /survey_responses?order=desc': {
    status: 200,
    body: [{ id: 1 }, { id: 2 }]
  },

  'POST /unsubscribes': {
    status: 201,
    body: { person_email: 'foo@example.com' }
  },

  'GET /unsubscribes': {
    status: 200,
    body: [
      { person_id: '475', email: 'foo@example.com', name: 'Foo', unsubscribed_at: 1440621400 },
      { person_id: '634', email: 'bar@example.com', name: 'Bar', unsubscribed_at: 1440621453 }
    ]
  },

  'GET /bounces': {
    status: 200,
    body: [
      { person_id: '475', email: 'foo@example.com', name: 'Foo', bounced_at: 1440621400 },
      { person_id: '634', email: 'bar@example.com', name: 'Bar', bounced_at: 1440621453 }
    ]
  },

  'GET /no_body': {
    status: 200,
    body_raw: null
  },

  'GET /invalid_json': {
    status: 200,
    body_raw: '{"invalid_json":123'
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
