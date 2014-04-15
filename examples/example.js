var delighted = new require('../')('DELIGHTED_API_KEY');


// create a person
delighted.person.create({

})
.then(function(response){
	console.log(response);
}, function(error){
	console.log(error);
});

delighted.surveyResponse.list()
.then(function(response){
	console.log(response);
}, function(error){
	console.log(error);
});

