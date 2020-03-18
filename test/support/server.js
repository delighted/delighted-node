var http = require('http');

module.exports = function(port, mapping) {
  var handler = function(request, response) {
    var request_index = request.method + " " + request.url;
    var mapped = mapping[request_index];
    // Allow for multiple subsequent requests
    if (Array.isArray(mapped)) {
      // Will loop back requests if needed
      if (this.call_history[request_index] !== undefined && this.call_history[request_index] < mapped.length - 1) {
        this.call_history[request_index]++;
        mapped = mapped[this.call_history[request_index]];
      } else {
        this.call_history[request_index] = 0;
        mapped = mapped[this.call_history[request_index]];
      }
    }
    var body = mapped.body_raw !== undefined ? mapped.body_raw : JSON.stringify(mapped.body);

    response.writeHead(mapped.status, mapped.headers || {});
    response.end(body);

    return response;
  };

  var server = http.createServer(handler);
  server.call_history = {};

  server.listen(port);

  return server;
}
