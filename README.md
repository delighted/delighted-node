# Delighted API Node Client

Official node.js client for the Delighted API. This is intended for server-side use only and does not support client side JavaScript.

### Usage

Configuration and initialize the client all in one go:

```javascript
var delighted = require('delighted')('API_KEY');
```

All resources can be accessed directly off of the `delighted` instance. Also, all actions immediately return a promise. In this initial example we'll create a person and log out their attributes when the promise resolves (finishes):

```javascript
var params = { email: 'lady@example.com', name: 'Lady', delay: 60 };
delighted.person.create(params).then(function(person) {
  console.log(person);
});
```

Previously subscribed people can be unsubscribed:

```javascript
delighted.unsubscribe.create({ person_email: 'lady@example.com' });
```

Pending survey requests can be deleted:

```javascript
delighted.surveyRequest.delete_pending({
  person_email: 'lady@example.com'
});
```

Responses can be created for somebody using their id. Note that the id is not the same as their email:

```javascript
delighted.surveyResponse.create({ person: person.id, score: 10 });
```

Get a paginated list of all responses:

```javascript
delighted.surveyResponse.all({ page: 2 }).then(function(responses) {
  responses.length; // => 20
});
```

Retrieve summary metrics of all responses:

```javascript
delighted.metrics.retrieve();
```

### Adavanced Configuration & Testing

All of the connection details can be configured through the `delighted` constructor, primarily for testing purposes. The available configuration options are:

* host - defaults to `api.delighted.com`
* port - defaults to `443`
* base - defaults to `/v1`
* headers - specifies JSON for `Accept` and `Content-Type` while setting a
  versioned `User-Agent`.
* scheme - defaults to `https`

Testing with real requests against a mock server is the easiest way to integration test your application. For convenience, and our own testing, a test server is provided with the `delighted` package. Below is an example of testing the `person` resource within an application:

```javascript
var delighted  = require('delighted');
var mockServer = require('delighted/server');
var instance   = delighted(API_KEY, {
  host:   'localhost',
  port:   5678,
  base:   '',
  scheme: 'http'
});

var mapping = {
  '/people': {
    status: 201,
    body: { email: 'foo@example.com' }
  }
};

var server = mockServer(5678, mapping);
```

Setting up the server only requires a port and a mapping. The mapping should match an exact endpoint and will send back a JSON body with the specified status code. With the server running you can then make a request:

```javascript
instance.person.create({ email: 'foo@example.com' }).then(function(response) {
  console.log(response); //=> { email: 'foo@exampe.com' }
});
```

### Contributing

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request
