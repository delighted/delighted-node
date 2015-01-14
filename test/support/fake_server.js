var http = require('http');

var responses = {
  '/fake': { message: 'OK' }
};

var handler = function(request, response) {
  var body = JSON.stringify(responses[request.url]);

  response.writeHead(200)
  response.end(body);

  return response;
};

module.exports = function(port) {
  var server = http.createServer(handler);

  server.listen(port);

  return server;
}
