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

var routes = require('./routes/tvshows')(app);

app.get("/", function(req, res){

  var routes = app.routes;
  var rutas = "";
  for (var verb in routes){
    if (routes.hasOwnProperty(verb)) {
      routes[verb].forEach(function(route){
        rutas += verb + " : " +route['path'] + "<br/>";
      });
    }
  }
  res.send("Hello world!<br/>"  + rutas);
});


mongoose.connect('mongodb://user_db:pass_db@ds029051.mongolab.com:29051/mongotest', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

server.listen(process.env.PORT, function(){
  console.log("Node server running.");
});