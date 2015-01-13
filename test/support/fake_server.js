var http = require('http');

var handler = function(request, response) {
  response.writeHead(200)

  return response.end()
};

module.exports = function(port) {
  var server = https.createServer(handler);

  server.listen(port);

  return server;
}
