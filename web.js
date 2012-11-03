var express = require('express');
var app = express.createServer();

app.set('views', __dirname + '/views');
app.use(express.static(__dirname));

app.get('/', function(req, res){res.render('index.jade');});

var port = process.env.PORT || 5000;

app.listen(port);