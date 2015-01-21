var Delighted = require('./lib/delighted');

module.exports = function(key) {
  return new Delighted(key);
};
