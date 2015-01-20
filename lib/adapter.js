function isObject(object) {
  return (typeof object === 'object')
}

function materialize(object) {
  // Defined dynamically to avoid circular require errors
  var mapping = {
    'person' : require('./Person')
  };

  for (var key in object) {
    var Constructor = mapping[key];

    if (isObject(object[key]) && !!Constructor) {
      object[key] = new Constructor(object[key]);
    }
  }

  return object;
}

module.exports = {
  load: function(payload) {
    var parsed = JSON.parse(payload);

    if (Array.isArray(parsed)) {
      return parsed.map(materialize);
    } else {
      return materialize(parsed);
    }
  },

  dump: function(object) {
    return JSON.stringify(object);
  }
};
