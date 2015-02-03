[![Build Status](https://travis-ci.org/delighted/delighted-node.svg)](https://travis-ci.org/delighted/delighted-node)

# Delighted API Node Client

Official Node.js client for the [Delighted API](https://delighted.com/docs/api).

**Note:** This is intended for server-side use only and does not support client-side JavaScript.

## Installation

Run `npm install delighted --save` to install.

## Configuration

To get started, you need to require the client and configure it with your secret API key. You can require, configure and initialize the client in one go:

```javascript
var delighted = require('delighted')('YOUR_API_KEY');
```

For further options, read the [advanced configuration section](#advanced-configuration).

**Note:** Your API key is secret, and you should treat it like a password. You can find your API key in your Delighted account, under *Settings* > *API*.

## Usage

All resources can be accessed directly off of the `delighted` instance we created above. All actions immediately return a promise. In this initial example we'll create a person and log out their attributes when the promise resolves (finishes):

```javascript
var params = {
  email: 'jony@appleseed.com',
  name:  'Jony Appleseed',
  delay: 86400
};

delighted.person.create(params).then(function(person) {
  console.log(person);
});
```

Previously subscribed people can be unsubscribed:

```javascript
delighted.unsubscribe.create({ person_email: 'jony@appleseed.com' });
```

Pending survey requests can be deleted:

```javascript
delighted.surveyRequest.deletePending({ person_email: 'jony@appleseed.com' });
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

## <a name="advanced-configuration"></a> Adavanced configuration & testing

All of the connection details can be configured through the `delighted` constructor, primarily for testing purposes. The available configuration options are:

* `host` – defaults to `api.delighted.com`
* `port` – defaults to `443`
* `base` – defaults to `/v1`
* `headers` – defaults to specifying `application/json` for `Accept` and `Content-Type` and sets `User-Agent` to identify the Delighted API Node Client and version.
* `scheme` – defaults to `https`

Testing with real requests against a mock server is the easiest way to integration test your application. For convenience, and our own testing, a test server is provided with the `delighted` package. Below is an example of testing the `person` resource within an application:

```javascript
var delighted  = require('delighted');
var mockServer = require('delighted/server');
var instance   = delighted('DUMMY_API_KEY', {
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

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Author

Originally by Sean McGary. Graciously transfered and now officially maintained by Delighted.
