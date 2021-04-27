var server = require('./support/server');
var Client = require('../lib/Client');

var host = 'localhost';
var port = 7654;

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

  'GET /autopilot/email': {
    status: 200,
    body: { platform_id: 'email', active: true, frequency: 7889238, created_at: 1619203221, updated_at: 1619203226 }
  },

  'GET /autopilot/email/memberships': {
    status: 200,
    body:[
      { created_at: 1619203221, updated_at: 1619203226, person: { id: 1, email: "person-1@example.com" } },
      { created_at: 1619203221, updated_at: 1619203226, person: { id: 2, email: "person-2@example.com" } }
    ]
  },

  'POST /autopilot/email/memberships': {
    status: 201,
    body: { person: { id: 1, email: "person-1@example.com" }}
  },

  'DELETE /autopilot/email/memberships?person_email=person-1%40example.com': {
    status: 202,
    body: { person: { id: 1, email: "person-1@example.com" }}
  },

  'GET /metrics': {
    status: 200,
    body: { nps: 0 }
  },

  'GET /metrics?since=1424359740': {
    status: 200,
    body: { nps: 10 }
  },

  'GET /people': {
    status: 200,
    body: [
        { id: '123', name: 'foos', email: 'foo@example.com' },
        { id: '456', name: 'ball', email: 'ball@example.com' },
      ],
    headers: {
      'Link': '<http://' + host + ':' + port + '/v1/people.json?page_info=123456789>; rel="next"'
    }
  },

  'GET /v1/people.json?page_info=123456789': {
    status: 200,
    body: [
        { id: '789', name: 'win', email: 'goal@example.com' }
      ]
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

  'DELETE /people/email%3Afoo%40example.com': {
    status: 202,
    body: { ok: true }
  },

  'DELETE /people/phone_number%3A%2B14155551212': {
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
