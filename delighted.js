var Delighted = require('./lib/Delighted');

console.warn(
  '[delighted] DEPRECATION NOTICE: Delighted is being sunset on June 30, 2026. ' +
  'This package is deprecated and will no longer be maintained or receive updates. ' +
  'For more information, visit the Delighted Sunset FAQ: ' +
  'https://help.delighted.com/article/840-delighted-sunset-faq'
);

module.exports = function(key, options) {
  return new Delighted(key, options);
};
