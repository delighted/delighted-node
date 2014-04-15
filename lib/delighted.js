

var makeRequest = function(){

};

var delighted = function(apiKey){
	var API_VERSION = 'v1';
	var BASE_URL = 'api.delightedapp.com';

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

			}
		},
		surveyRequest: {
			/*
				@string email 				- Email of the person you want to delete scheduled surveys for. (required)
			*/
			deletePending: function(email){

			}
		},
		surveyResponse: {
			/*
				@string person 				- The ID of the person responding. (required)
				@object person_properties 	- Custom properties to associate with this response.
				@integer score 				- Score of the response, from 0 to 10. (required)
				@string comment 			- An optional comment that the person left when responding.
			*/
			create: function(){

			},
			/*
				@integer per_page 			- Number of results to return per page. The default is 20. The maximum is 100.
				@integer page 				- 
				@integer since 				- 
				@integer until 				- 
				@string trend 				- 
				@string order   			- 
				@array expand 				-
			*/
			all: function(){

			}
		},
		metrics: {
			/*
				@integer since
				@integer until
				@string trend
			*/
			retrieve: function(){

			}
		}
	}
};