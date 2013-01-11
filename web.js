var express = require('express');
var app = express.createServer();
var fs = require('fs');
var recipes = require('./routes/recipes');
var authentication = require('./routes/authentication');

app.set('views', __dirname + '/views');
app.use(express.static(__dirname));
app.use(express.bodyParser());

app.get('/', function(req, res){res.render('index.jade');});

app.get('/brewsnwood', function(req, res){res.render('brewsnwood.jade');});

app.post('/recipes', function(req, res){if (authentication.checkAuthentication(req,res)) recipes.createRecipe(req,res);});

app.get('/recipes', function(req, res){
    var file = './data/recipes.json';

    fs.readFile(file, 'utf8', function (err, data) {
      if (err) {
          console.log(err)
      }

      res.render('recipes.jade', JSON.parse(data));
    });
});


var port = process.env.PORT || 5000;

app.listen(port);