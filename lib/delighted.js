'use strict';

Delighted.DEFAULT_HOST      = 'api.delighted.com';
Delighted.DEFAULT_PORT      = 443;
Delighted.DEFAULT_BASE_PATH = '/v1';
Delighted.DEFAULT_HEADERS   = {
  'Accept':       'application/json',
  'Content-Type': 'application/json'
};

function Delighted() {
};

module.exports = Delighted;
