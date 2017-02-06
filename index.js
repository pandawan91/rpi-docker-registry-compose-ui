#!/usr/bin/env node

var express = require('express'),
bodyParser = require('body-parser'),
app = express();

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.all("/", function(req, res){
  console.log(req.body.events);
  res.send("OK");
});

app.listen("8080", function(){
  console.log("service ready !!");
});
