var express = require('express');
var app = express.createServer();
var fs = require('fs');

app.set('views', __dirname + '/views');
app.use(express.static(__dirname));

app.get('/', function(req, res){res.render('index.jade');});

app.get('/brewsnwood', function(req, res){res.render('brewsnwood.jade');});

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