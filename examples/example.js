var delighted = new require('../')('DELIGHTED_API_KEY');


// create a person
delighted.person.create({
	email: 'someemail@somedomain.com'
})
.then(function(response){
	console.log(response);
}, function(error){
	console.log(error);
});


delighted.surveyResponse.all({
	per_page: 10
})
.then(function(response){
	console.log(response);
}, function(error){
	console.log(error);
});

