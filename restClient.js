var rest = require('restler-master');

var jsonData = "{ \"name\" : \"newbrew\", \"style\" : \"IPA\", \"brewers\" : [\"brent\"], \"grain_bill\" : [\"\"], \"hops\" : [\"\"]}";
var username = 'broni';
var password = 'jimsucksatmagic';
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
var header = {'Authorization':auth};
var headers = {'headers':header};
rest.postJson('http://localhost:5000/recipes', jsonData, headers).on('complete', function (data, response) {
	console.log (data);
});
