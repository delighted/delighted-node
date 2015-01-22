var querystring = require('querystring');

function isFunction(func) {
  return typeof func == 'function';
}

module.exports = {
  stringify: function(object) {
    var converted = {};

    for (var key in object) {
      if (isFunction(object[key].getTime)) {
        converted[key] = Math.round(object[key].getTime() / 1000);
      } else {
        converted[key] = object[key];
      }
    }

    return querystring.stringify(converted);
  }
};
