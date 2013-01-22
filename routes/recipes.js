var mongo = require('mongodb'),
    BSON = mongo.BSONPure;
var authentication = require('./authentication');

var mongoUri = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost:27017/brewhouse'; 

isValidateRecipe = function(recipe) {
	var requiredFields = ["name","style","brewers","grain_bill", "hops"];
	var valid = true;
	for (idx in requiredFields) {
	    valid &= (recipe[requiredFields[idx]] != null);
	}
    return valid;
}

getAllRecipes = function(callback) {
    mongo.Db.connect(mongoUri, function (err, db) {
        db.collection('recipes', function(er, collection) {
            if (er) return callback(er);
            
            collection.find({}, function(err, recipes) {
                var all_recipes = [];
                recipes.each(function(err, recipe) {
                    if (recipe == null) return callback(null, all_recipes);
                    else all_recipes.push(recipe);
                })

            });
        });
    });
};


/*
 *
 * Delete the specified recipe.
 * recipe_id - the recipe's id
 * callback - function(error)
 *
 */
deleteRecipe = function(recipe_id, callback) {
    var o_id = new BSON.ObjectID(recipe_id);
    mongo.Db.connect(mongoUri, function (err, db) {
        db.collection('recipes', function(er, collection) {
            if (er) return callback(er);
            collection.remove({'_id' : o_id}, function(err) {
                return callback(err);
            });
        });
    });
};

createRecipe = function(new_recipe, callback) {
    mongo.Db.connect(mongoUri, function (err, db) {
        db.collection('recipes', function(er, collection) {
            collection.insert(new_recipe, {safe: true}, function(er,rs) {
                callback(er);
            });
        });
    });
};

exports.create = createRecipe;
exports.remove = deleteRecipe;
exports.getAll = getAllRecipes;
exports.isValid = isValidateRecipe;