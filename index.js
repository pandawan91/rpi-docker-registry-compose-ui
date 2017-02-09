#!/usr/bin/env node

var express = require('express'),
  bodyParser = require('body-parser'),
  context = require('./src/dal/context.js').create('mysql', 'root', 'toor'),
  sequelize = require('sequelize'),
  app = express();

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: 'application/vnd.docker.distribution.events.v1+json'
}));

app.all("/", function(req, res) {
  console.log(req.body.events);
  res.send("OK");
});

app.listen("8080", function() {
  console.log("service ready !!");
});
