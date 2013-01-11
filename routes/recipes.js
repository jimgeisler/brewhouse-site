var fs = require('fs');
	
parseNewRecipe = function (req, res) {
	var requiredFields = ["name","style","brewers","grain_bill", "hops"];
	var data = req.body;
	console.log(data);
	try {
		var obj = JSON.parse(data);
	} catch (err) {
		res.statusCode = 400; // bad request
		console.log('Error parsing recipe');
		res.end('<html><body>Error parsing recipe: ' + err + '</body></html>');
		return new Error();
	}
	if(!obj.name || !obj.style || !obj.brewers) {
		res.statusCode = 400; // bad request
		console.log('Recipe did not have required fields');
		res.end('<html><body>Missing recipe required fields [name, style, brewers, grain_bill, hops]</body></html>');
		return new Error();
	}
	return obj;
}

addNewRecipe = function(file, newRecipe, res) {
    fs.readFile(file, 'utf8', function (err, data) {
		if (err) {			
			res.statusCode = 400; // bad request
			console.log('Error reading existing recipes: ' + err);
			res.end('<html><body>Error reading existing recipes: ' + err + '</body></html>');
			return new Error();
		} else {
			var recipes = JSON.parse(data);
			recipes.recipes.push(newRecipe);
			fs.writeFile(file, JSON.stringify(recipes, null, 5), function (err) {
				if (err) {
					res.statusCode = 400; // bad request
					console.log('Error writing recipes: ' + err);
					res.end('<html><body>Error writing recipes: ' + err + '</body></html>');
				} else {
					res.statusCode = 200; // OK
					console.log('Recipe added');
					res.end('<html><body>Recipe added</body></html>');
				}
			});
		}		
    });
}

exports.createRecipe = function(req, res) {
    var file = './data/recipes.json';

	console.log("Creating recipe...");
	var newRecipe = parseNewRecipe(req, res);
	if (!(newRecipe instanceof Error)) {	
		addNewRecipe(file, newRecipe, res);
	}
};

