var express = require('express'),
    app = express.createServer();
    
    
var requestHandlers = require('./requestHandlers');

start = function() {
 
    app.set('views', __dirname + '/views');
    app.use(express.static(__dirname));
    app.use(express.bodyParser());

    app.get('/', requestHandlers.site.index);

    app.get('/brewhouse/:id', requestHandlers.brewhouse.index);

    app.delete('/recipes', requestHandlers.recipe.remove);
    app.get('/recipes', requestHandlers.recipe.index);
    app.post('/recipes', requestHandlers.recipe.create);


    var port = process.env.PORT || 5000;

    app.listen(port);
    console.log('App started on port ' + port);
    
}

exports.start = start;