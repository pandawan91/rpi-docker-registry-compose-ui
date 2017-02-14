#!/usr/bin/env node

var express = require('express'),
  bodyParser = require('body-parser'),
  context = require('./src/dal/context.js')
    .create('mysql', 'root', 'toor'),
  sequelize = require('sequelize'),
  eventListener = require('./src/services/event-listener.js')
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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://registry:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/", function(req, res) {
  for(var index in req.body.events)
    eventListener.sendToDatabase(req.body.events[index], context);
  res.send("OK");
});

app.get("/repositories", (req, res) => {
  context.models.Repositories.findAll({
    include: [
      {model: context.models.Tags, required: true}
      //context.models.Actions,
      // context.models.Repository
    ]
  }).then((repo) => {
    res.send(repo);
  });
});

app.listen("8080", function() {
  console.log("service ready !!");
});
