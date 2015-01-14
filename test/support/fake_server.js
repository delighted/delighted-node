var http = require('http');

var mapping = {
  '/fake': { status: 200, body: { message: 'OK' } },
  '/401':  { status: 401, body: null }
};

var handler = function(request, response) {
  var mapped = mapping[request.url];
  var body = JSON.stringify(mapped.body);

  response.writeHead(mapped.status);
  response.end(body);

  return response;
};

module.exports = function(port) {
  var server = http.createServer(handler);

  server.listen(port);

  return server;
}
