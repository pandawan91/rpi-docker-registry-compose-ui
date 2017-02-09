var sequelize = require('sequelize'),
  models = require('./models/models.js');
var exports = module.exports = {};

exports.create = function(connectionString, username, password) {
  var context = new sequelize.Sequelize('DockerRegistry', username, password, {
      host: connectionString,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }),
    contextModels = {
      actions: models.actions.create(context),
      actors: models.actors.create(context),
      requests: models.requests.create(context),
      tags: models.tags.create(context),
      repositories: models.repositories.create(context),
      targets: models.targets.create(context),
      sources: models.sources.create(context),
      dockerEvents: models.dockerEvents.create(context)
    };
  setForeignKeys(contextModels);

  var modelKeys = Object.keys(contextModels);

  for(var modelIndex in modelKeys)
    contextModels[modelKeys[modelIndex]].sync().then(function(){
      console.log("DONE");
    });

  return context;
}

var setForeignKeys = function(contextModels) {
  contextModels.actions.hasMany(contextModels.dockerEvents, {
    foreignKey: "ActionId"
  });
  contextModels.actors.hasMany(contextModels.dockerEvents, {
    foreignKey: "ActorId"
  });
  contextModels.repositories.hasMany(contextModels.dockerEvents, {
    foreignKey: "RepositoryId"
  });
  contextModels.targets.hasMany(contextModels.dockerEvents, {
    foreignKey: "TargetId"
  });
  contextModels.requests.hasMany(contextModels.dockerEvents, {
    foreignKey: "RequestId"
  });
  contextModels.sources.hasMany(contextModels.dockerEvents, {
    foreignKey: "SourceId"
  });

  contextModels.tags.hasMany(contextModels.targets, {
    foreignKey: "TagId"
  });
  contextModels.repositories.hasMany(contextModels.targets, {
    foreignKey: "RepositoryId"
  });

  contextModels.tags.hasMany(contextModels.repositories,{
    foreignKey: "TagId"
  });
}

exports.test = function() {
  return sequelize;
}
