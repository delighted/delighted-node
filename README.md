# Delighted API Node Client

Official node.js client for the Delighted API. This is intended for server-side
use only and does not support client side JavaScript.

### Usage

Configuration and initialize the client all in one go:

```javascript
var delighted = require('delighted')('API_KEY');
```

All resources can be accessed directly off of the `delighted` instance. Also,
all actions immediately return a promise. In this initial example we'll create a
person and log out their attributes when the promise resolves (finishes):

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

Responses can be created for somebody using their id. Note that the id is not
the same as their email:

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

### Contributing

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request
