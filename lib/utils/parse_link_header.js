module.exports = function(link) {
  var links = {};
  if (!link) {
    return links;
  }
  var parts = link.split(",");
  // Parse each part into a named link
  parts.forEach(function(part) {
    var section = part.split(';');
    if (section.length < 2) {
      return;
    }
    var url = section[0].match(/<(.*)>/)[1];
    var name = section[1].match(/rel="?([^"]*)"?/)[1];
    links[name] = url;
  });
  return links;
};
