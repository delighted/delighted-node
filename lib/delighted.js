var request = require('./request');
var q = require('q');
var _ = require('lodash');

var makeRequest = function(){

};

var delighted = function(apiKey, options){
	options = options || {};
	var API_VERSION = 'v1';
	var BASE_URL = 'api.delightedapp.com';

	var serverConfig = {
		hostname: BASE_URL,
		auth: {
			username: apiKey,
			password: ''
		}
	};
	var requestConfig = {
		isDev: false || !!options.isDev,
		enableLogs: false || !!options.enabledLogs,
		secure: true,
		dataType: 'json'
	};

	var buildUrl = function(url){
		return '/' + API_VERSION + url;
	};

	var checkRequiredFields = function(requiredFields, data){
		var error = false;
		var errorData = {};
		_.each(requiredFields, function(field){
			if(!(field in data)){
				error = true;
				errorData[field] = 'Field is missing';
			}
		});

		if(error){
			return q.reject(errorData);
		}

		return q.resolve();
	};

	var req = new request(serverConfig, requestConfig);

	return {
		person: {
			/*
				@string email  				- Email of the person (required)
				@string name  				- Name of the person
				@integer delay 				- The time in seconds to wait before sending the survey email. Default is 0 which will send immediately
				@properties object 			- Custom properties to associate with the sent survey
				@boolean send 				- Set to false if you do not want to send a survey email. The default is true.
			*/
			create: function(options){
				return checkRequiredFields(['email'], options)
					.then(function(){
						return req.post({
							url: buildUrl('/people.json'),
							data: options
						});
					});
			}
		},
		surveyRequest: {
			/*
				@string email 				- Email of the person you want to delete scheduled surveys for. (required)
			*/
			deletePending: function(email){
				return req.del({
					url: buildUrl('/people/' + email + '/survey_requests/pending.json')
				});
			}
		},
		surveyResponse: {
			/*
				@string person 				- The ID of the person responding. (required)
				@object person_properties 	- Custom properties to associate with this response.
				@integer score 				- Score of the response, from 0 to 10. (required)
				@string comment 			- An optional comment that the person left when responding.
			*/
			create: function(options){
				return checkRequiredFields(['person', 'score'], options)
					.then(function(){
						return req.post({
							url: buildUrl('/survey_responses.json'),
							data: options
						});
					});
			},
			/*
				@integer per_page 			- Number of results to return per page. The default is 20. The maximum is 100.
				@integer page 				- The page number to return. The default is 1.
				@integer since 				- An optional Unix timestamp to restrict responses to those created on or after this time. Formatting example (for 1 hour ago): "1397592449".
				@integer until 				- An optional Unix timestamp to restrict responses to those created on or before this time. Formatting example (for the current time): 1397596049.
				@string trend 				- An optional ID of a trend to restrict responses to that trend. To obtain the ID for a trend, visit the trends page. For example, if the URL for the desired trend ends with /trends/1234 the ID of that trend is 1234.
				@string order   			- An optional sort order for the responses. The default is asc, which will return responses in chronological order (oldest first). To get responses in reverse chronological order (newest first), specify desc.
				@array expand 				- By default, only the person id is included in the response. If you want the full person object included, pass expand[]=person.
			*/
			all: function(options){
				return req.get({
					url: buildUrl('/survey_responses.json'),
					data: options
				});
			}
		},
		metrics: {
			/*
				@integer since 				- An optional Unix timestamp to restrict metrics to those created on or after this time. Formatting example (for 1 hour ago): 1397592449.
				@integer until 				- An optional Unix timestamp to restrict metrics to those created on or before this time. Formatting example (for the current time): 1397596049.
				@string trend 				- An optional ID of a trend to restrict metrics to that trend. To obtain the ID for a trend, visit the trends page. For example, if the URL for the desired trend ends with /trends/1234 the ID of that trend is 1234.
			*/
			retrieve: function(options){
				return req.get({
					url: buildUrl('/metrics.json'),
					data: options
				});
			}
		}
	}
};

module.exports = delighted;