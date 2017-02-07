#!/usr/bin/env node

var express = require('express'),
bodyParser = require('body-parser'),
mongoClient = require('mongodb').MongoClient,
app = express(),
mongoDbUrl = "mongodb://registry:27017/"

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.docker.distribution.events.v1+json'}));

app.all("/", function(req, res){
  console.log(req.body.events);
  res.send("OK");
});

app.listen("8080", function(){
  mongoClient.connect(mongoDbUrl, function(err, db){
    if(err) throw err;
    console.log("Connected to DB");
    db.close();
  });
  console.log("service ready !!");
});
