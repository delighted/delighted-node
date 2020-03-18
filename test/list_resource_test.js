var expect       = require('chai').expect;
var sinon        = require('sinon');
var mockServer   = require('./support/server');
var Client       = require('../lib/Client');
var Resource     = require('../lib/Resource');
var ListResource = require('../lib/ListResource');

describe('ListResource', function() {
  var host = 'localhost';
  var port = 5678;

  var clock;
  var server;
  var client = new Client({
    host: host,
    port: port
  });

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    var mapping = {
      'GET /v1/pagination_test': {
        status: 200,
        body: [{ id: '111', email: 'foo@example.com', name: 'foos' }],
        headers: {
          'Link': '<http://' + host + ':' + port + '/v1/pagination_test?page_info=123>; rel="next"'
        }
      },
      'GET /v1/pagination_test?page_info=123': {
        status: 200,
        body: [{ id: '222', email: 'ball@example.com', name: 'ball' }],
        headers: {
          'Link': '<http://' + host + ':' + port + '/v1/pagination_test?page_info=456>; rel="next"'
        }
      },
      'GET /v1/pagination_test?page_info=456': {
        status: 200,
        body: [{ id: '333', email: 'end@example.com', name: 'end' }],
        headers: {}
      },
      'GET /v1/pagination_will_be_rate_limited_once': {
        status: 200,
        body: [{ id: '112', email: 'fooz@example.com', name: 'fooz' }],
        headers: {
          'Link': '<http://' + host + ':' + port + '/v1/pagination_is_rate_limited_once>; rel="next"'
        }
      },
      'GET /v1/pagination_is_rate_limited_once': [
        {
          status: 429,
          body: [],
          headers: { 'Retry-After': '3' }
        },
        {
          status: 200,
          body: [{ id: '223', email: 'boll@example.com', name: 'boll' }],
        }
      ],
      'GET /v1/pagination_is_rate_limited_always': {
        status: 429,
        body: [],
        headers: { 'Retry-After': '4' }
      },
    };

    server = mockServer(port, mapping);
  });

  afterEach(function() {
    clock.restore();
    server.close();
  });

  describe('#autoPagingEach', function() {
    it('paginates through entire list', function () {
      var list = [];
      var listResource = new ListResource(new Resource(client), '/v1/pagination_test', null, client);
      return listResource
        .autoPagingEach(function(p) {
          list.push(p);
        })
        .then(function() {
          // We have all 3 pages
          expect(list).to.have.length(3);
          expect(list[0].id).to.eq('111');
          expect(list[0].name).to.eq('foos');
          expect(list[0].email).to.eq('foo@example.com');
          expect(list[1].id).to.eq('222');
          expect(list[1].name).to.eq('ball');
          expect(list[1].email).to.eq('ball@example.com');
          expect(list[2].id).to.eq('333');
          expect(list[2].name).to.eq('end');
          expect(list[2].email).to.eq('end@example.com');
        });
    });

    it('stops paginating when requested', function () {
      var list = [];
      var listResource = new ListResource(new Resource(client), '/v1/pagination_test', null, client);
      return listResource
        .autoPagingEach(function(p) {
          list.push(p);
          if (list.length === 1) {
            return false;
          }
        })
        .then(function() {
          expect(list).to.have.length(1);
          expect(list[0].id).to.eq('111');
          expect(list[0].name).to.eq('foos');
          expect(list[0].email).to.eq('foo@example.com');
        });
    });

    it('calls our reject function on rate limit', function () {
      var list = [];
      var listResource = new ListResource(new Resource(client), '/v1/pagination_will_be_rate_limited_once', null, client);
      return listResource
        .autoPagingEach(function(p) {
          list.push(p);
        }, { auto_handle_rate_limits: false })
        .then(function() {
          // It should not reach done
          expect(true).to.be.false;
        }, function(error) {
          // We only received one item
          expect(list).to.have.length(1);
          expect(error.name).to.eq('Error');
          expect(error.type).to.eq('TooManyRequestsError');
          expect(error.retryAfter).to.eq(3);
        });
    });

    it('automatically handles rate limit if requested', function () {
      var list = [];
      var listResource = new ListResource(new Resource(client), '/v1/pagination_will_be_rate_limited_once', null, client);
      return listResource
        .autoPagingEach(function(p) {
          list.push(p);
        }, {
          auto_handle_rate_limits: true,
          auto_handle_rate_limits_callback: function(wait) {
            expect(wait).to.eq(3);
            // Fast forward time for testing
            clock.tick(3000);
          }
        })
        .then(function() {
          // We should have received all 2 (first and second page) items
          expect(list).to.have.length(2);
          expect(list[0].id).to.eq('112');
          expect(list[0].name).to.eq('fooz');
          expect(list[0].email).to.eq('fooz@example.com');
          expect(list[1].id).to.eq('223');
          expect(list[1].name).to.eq('boll');
          expect(list[1].email).to.eq('boll@example.com');
        }, function(error) {
          // We should not have received any errors
          expect(true).to.be.false;
        });
    });

    it('returns an exception if auto handles rate limit exceeds max retries', function () {
      var list = [];
      var retries = 0;
      var listResource = new ListResource(new Resource(client), '/v1/pagination_is_rate_limited_always', null, client);
      return listResource
        .autoPagingEach(function(p) {
          list.push(p);
        }, {
          auto_handle_rate_limits: true,
          auto_handle_rate_limits_max_retries: 12,
          auto_handle_rate_limits_callback: function(wait) {
            expect(wait).to.eq(4);
            retries++;
            // Fast forward time for testing
            clock.tick(4000);
          }
        })
        .then(function() {
          // This test always errors, so we never reach done status here
          expect(true).to.be.false;
        }, function(error) {
          // We received no items, and an error
          expect(list).to.have.length(0);
          expect(error.name).to.eq('Error');
          expect(error.type).to.eq('PaginationError');
          expect(error.message).to.include('maximum retries exceeded');
          // We retried as many times as requested
          expect(retries).to.eq(12);
        });
    });
  });
});
