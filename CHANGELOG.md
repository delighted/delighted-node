## 2.1.0-rc1

Features:

- Adds support for Autopilot (retrieving configuration, listing people, adding people, and removing people)

## 2.0.0 (2020-03-18)

Features:

- Adds support for listing people

Compatibility changes:

- Add support for NodeJS 12, 13
- Drop support for NodeJS 0.10, 0.11, 0.12

## 1.3.0 (2018-05-22)

Features:

- Adds support for deleting people

## 1.2.0 (2017-10-18)

Features:

- Adds support for 429 rate limited HTTP responses.

## 1.1.5 (Prerelease)

Bugfixes:

- Headers that are set for a particular request are no longer erroneously carried over to other requests. This could cause connection problems with the server if a Content-Length header was set by a previous request and was not applicable for the next request.
- Fix error object to include response body.

## 1.1.4 (2016-10-25)

Bugfixes:

- Fix path in to test server (#10).

## 1.1.3 (2015-06-02)

Bugfixes:

- Fail gracefully when parsing invalid JSON from response body.

## 1.1.2 (2015-11-24)

Bugfixes:

- Fix calculation of Content-Length header value when using UTF-8.

## 1.1.1 (2015-11-18)

Bugfixes:

- Allow passing of options via `require('delighted')(key, options)`

## 1.1.0 (2015-09-29)

Features:

- First official release!
- Add support for listing People who have unsubscribed
- Add support for listing People whose emails bounced

## 1.0.0-beta2 (2015-02-19)

Bugfixes:

- Change case for Delighted require [Seth McGuinness]

## 1.0.0-beta (2015-02-02)

Features:

- Initial beta release! This release is a complete rewrite and is *not* backward compatible with `v0.0.1`. Please refer to the README for configuration and usage examples.
