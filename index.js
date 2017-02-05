#!/usr/bin/env node

var express = require('express'),
app = express();

app.all("/", function(req, res){
  console.log(req.events);
});

app.listen("8080", function(){
  console.log("service ready");
});
