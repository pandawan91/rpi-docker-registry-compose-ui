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
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/", function(req, res) {
  for(var index in req.body.events)
    eventListener.sendToDatabase(req.body.events[index], context);
  res.send("OK");
});

app.get("/repositories", (req, res) => {
  if(req.query.repositoryname)
    context.models.Repositories.findOne({
      where: {
        Name: req.query.repositoryname
      }
    }).then((repo) => {
      res.send(repo);
    });
  else {
    context.models.Repositories.findAll({
    }).then((repo) => {
      res.send(repo);
    });
  }
});

app.get("/tags", (req, res) => {
  context.query("SELECT Tags.Name FROM DockerRegistry.Tags AS Tags " +
    "INNER JOIN DockerRegistry.Repositories_Tags AS Repo_Tags " +
    "ON Tags.Id = Repo_Tags.TagId " +
    "INNER JOIN DockerRegistry.Repositories AS Repos " +
    "ON Repo_Tags.RepositoryId = Repos.Id " +
    "WHERE Repos.Name = ?", { replacements: [req.query.repositoryname], type: context.QueryTypes.SELECT
  }).then((tagNames) => {
    res.send(tagNames);
  });
});

app.get("/events", (req, res) => {
  context.query("SELECT DockerEvents.Stamp, Actions.Name FROM DockerEvents " +
  "INNER JOIN Actions ON DockerEvents.ActionId = Actions.Id " +
  "INNER JOIN Repositories ON DockerEvents.RepositoryId = Repositories.Id " +
  "WHERE Repositories.Name = ?", { replacements: [req.query.repositoryname], type: context.QueryTypes.SELECT
  }).then((result) => {
    res.send(result);
  });
});

app.listen("8080", function() {
  console.log("service ready !!");
});
