var _ = require('lodash');
var q = require('q');
var qs = require('querystring');
var logger = require('logsimple');

var getTime = function(startTime){
	var endTime = new Date();
	return endTime - startTime;
};

/**
	@object serverConfig - config items for the API/site you're connecting to
	@object requestConfig - config items specific to making the request
*/
var request = function(serverConfig, requestConfig){
	var http = requestConfig.secure ? require('https') : require('http');
	http.globalAgent.maxSockets = 1024;

	var enableLogs = !!requestConfig.enableLogs;

	var cookies = '';

	var defaultSendDataType = requestConfig.dataType || 'json';

	var makeRequest = function(method, url, data, headers, otherOptions){
		var deferred = q.defer();
		data = data || {};
		headers = _.extend({
			'Content-Type': 'application/json'
		}, (headers || {}));

		defaultSendDataType = otherOptions.dataType || defaultSendDataType;

		if(serverConfig.auth){
			serverConfig.auth = [serverConfig.auth.username, serverConfig.auth.password].join(':');
		}

		var options = _.extend({}, serverConfig, {
			path: [serverConfig.path, url].join(''),
			data: data,
			method: method,
			headers: headers
		});

		if(requestConfig.useCookies){
			options.headers.Cookie = cookies || '';
		}

		var sendData = '';
		if(defaultSendDataType == 'json'){
			var jsonString = JSON.stringify(data);
			var jsonBuffer = new Buffer(jsonString);
			
			options.headers['Content-Length'] = jsonBuffer.length

			sendData = jsonString;
			
		} else if(defaultSendDataType == 'form'){
			var formData = [];
			_.each(data, function(value, key){
				formData.push([key, value].join('='));
			});
			sendData = encodeURI(formData.length ? formData.join('&') : '');
			
		}

		if(requestConfig.isDev){
			console.log('------ OPTIONS ------');
			console.log(options);
			console.log('---------------------');
			console.log('------ HEADERS ------');
			console.log(headers);
			console.log('---------------------');
		}

		var startTime = new Date();
		var request = http.request(options, function(res){		

			var data = '';
			res.on('data', function(d){
				data += d.toString();
			});

			res.on('end', function(){
				if(requestConfig.useCookies){
					var c = res.headers['set-cookie'];
					cookies = _.isArray(c) && c.length ? c[0] : '';
				}

				var statusCode = res.statusCode;
				var responseTime = getTime(startTime);
				var responseTimeStr = responseTime + 'ms';

				var statusCodeTrunc = Math.floor(statusCode / 100);
				if(statusCodeTrunc == 2){
					enableLogs && logger.info(method + ' :: ' + statusCode + ' - ' + responseTimeStr, url);	
				} else {
					enableLogs && logger.warn(method + ' :: ' + statusCode + ' - ' + responseTimeStr, url);
				}

				var json;
				try {
					json = JSON.parse(data);
				} catch(e){}

				if(!json){
					enableLogs && logger.infoRed('api', 'invalid json response - ' + url, data);
					return deferred.reject({ err: 'invalid_json_response' });
				}

				if(statusCodeTrunc == 2){
					return deferred.resolve(json);
				} else {
					enableLogs && logger.error('api', 'error', data);
					return deferred.reject(json);
				}
			});
		});

		request.on('error', function(error){
			enableLogs && logger.error('api', 'error (' + url + ')', error);
			return deferred.reject({ err: error });
		});

		// 30 second timeout for now
		request.setTimeout(30000, function(){
			enableLogs && logger.infoRed('api', 'TIMEOUT ' + url + ')');
			return deferred.reject({ err: 'timeout' });
		});

		if(method != 'GET'){
			if(sendData && sendData.length){
				request.write(sendData);
			}

		}
		
		request.end();
		return deferred.promise;
	};

	var get = exports.get = function(options){
		var url = options.url || '';
		var data = options.data || {};

		var queryString = qs.stringify(data);

		if(queryString.length){
			url += ('?' + queryString);
		}

		return makeRequest('GET', url, {}, options.headers, options);
	};

	var post = exports.post = function(options){
		return makeRequest('POST', options.url, options.data, options.headers, options);
	};

	var del = exports.del = function(options){
		return makeRequest('DELETE', options.url, options.data, options.headers, options);
	};

	var put = exports.put = function(options){
		return makeRequest('PUT', options.url, options.data, options.headers, options);
	};

	return {
		get: get,
		post: post,
		del: del,
		put: put
	};
};

module.exports = request;