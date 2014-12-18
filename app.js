var express = require("express");
var http = require("http");
var mongoose = require('mongoose');
var app = express();
var server = http.createServer(app);

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.get("/", function(req, res){
  res.send("Hello world!");
});


mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

routes = require('./routes/tvshows')(app);

server.listen(3000, function(){
  console.log("Node server running on http://localhost:3000");
});
