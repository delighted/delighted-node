function isObject(object) {
  return (typeof object === 'object');
}

function materialize(object, resources) {
  resources = (resources || {});

  for (var key in object) {
    var resource = resources[key];

    if (isObject(object[key]) && !!resource) {
      object[key] = resource.materialize(object[key]);
    }
  }

  return object;
}

module.exports = {
  load: function(payload, resources) {
    var parsed = JSON.parse(payload);

    if (Array.isArray(parsed)) {
      return parsed.map(function(object) {
        return materialize(object, resources);
      });
    } else {
      return materialize(parsed, resources);
    }
  },

  dump: function(object) {
    return JSON.stringify(object);
  }
};
