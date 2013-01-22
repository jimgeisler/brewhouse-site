var recipes = require('./routes/recipes'),
    authentication = require('./routes/authentication');


var recipe = {
    create : function(req, res){
        if (authentication.checkAuthentication(req.headers['authorization'])) {
        	var data = req.body.recipe;
        	
        	var recipe;
        	try {
        		recipe = JSON.parse(data);
        	} catch (err) {
        		res.statusCode = 400; // bad request
        		console.log('Error parsing recipe');
        		res.end('<html><body>Error parsing recipe: ' + err + '</body></html>');
        	}
        	
        	if (!recipes.isValid(recipe)) {
        		res.statusCode = 400; // bad request
        		console.log('Recipe did not have required fields');
        		res.end('<html><body>Missing recipe required fields [name, style, brewers, grain_bill, hops]</body></html>');
        	} else {
        	    recipes.create(recipe, function(error) {
        			if (error) {
        				res.statusCode = 400; // bad request
        				console.log('Error writing recipes: ' + error);
        				res.end('<html><body>Error writing recipes: ' + error + '</body></html>');
        			} else {
        				res.statusCode = 200; // OK
        				console.log('Recipe added');
        				res.end('<html><body>Recipe added</body></html>');
        			}
        	    });
        	}
        } else {
            res.statusCode(401);
            res.end('Not authorized');   
        }
    },

    remove : function(req, res) {
        if (authentication.checkAuthentication(req.headers['authorization'])) {
            if (req.body.recipe_id) {
                recipes.remove(req.body.recipe_id, function(err) {
                    if (err) {
                      res.statusCode = 400;
                      res.end(err.message);
                    } else {
                      res.statusCode = 200;
                      res.end(JSON.stringify({'response':'Success'}));
                    }
                });   
            } else {
                res.statusCode(500);
                res.end('No recipe id provided.');
            }
        } else {
            res.statusCode(401);
            res.end('Not authorized');
        }
    },

    index : function(req, res){
        recipes.getAll(function(err, all_recipes) {
            res.render('recipes.jade', {'recipes' : all_recipes});
        })
    }
}

var brewhouse = {
    index: function(req, res){
        var brewer = req.param.id;
        if (brewer == 'jim') res.render('brewsnwood.jade');
        else res.render('brewsnwood.jade');
    }
}

var site = {
    index : function(req, res){
        res.render('index.jade');
    }
}

exports.recipe = recipe;
exports.brewhouse = brewhouse;
exports.site = site;