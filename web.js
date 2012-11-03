var express = require('express');
var app = express.createServer();

app.set('views', __dirname + '/views');
app.use(express.static(__dirname));

app.get('/', function(req, res){res.render('index.jade', {title: 'Franz Enzenhofer'});});

app.listen(5000);