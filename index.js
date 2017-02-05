#!/usr/bin/env node

var express = require('express'),
app = express();

app.all("/", function(req, res){
  console.log(req);
  res.send("hallo")
});

app.listen("8080", function(){
  console.log("service ready");
});
