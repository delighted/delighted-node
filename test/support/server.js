var http = require('http');

module.exports = function(port, mapping) {
  var handler = function(request, response) {
    var mapped = mapping[request.method + " " + request.url];
    var body = mapped.body_raw !== undefined ? mapped.body_raw : JSON.stringify(mapped.body);

    response.writeHead(mapped.status, mapped.headers || {});
    response.end(body);

    return response;
  };

  var server = http.createServer(handler);

  server.listen(port);

  return server;
}
