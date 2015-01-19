var querystring = require('querystring');

module.exports = {
  stringify: function(object) {
    var converted = {};

    for (var key in object) {
      if (object[key].getTime !== undefined) {
        converted[key] = object[key].getTime();
      } else {
        converted[key] = object[key];
      }
    }

    return querystring.stringify(converted);
  }
};
