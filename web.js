var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, res) {
  res.sendfile(__dirname + "/html/index.html");
});

app.get('*.js|*.css|*.jpg|*.gif|*.png|*.ttf', function (req,res){
  res.sendfile(__dirname + req.url);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});