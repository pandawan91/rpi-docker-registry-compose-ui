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
      dockerEvents: models.dockerEvents.create(context),
      repositories_tags: models.repositories_tags.create(context)
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
  contextModels.dockerEvents.belongsTo(contextModels.actions,{
    foreignKey: "ActionId"
  });
  contextModels.dockerEvents.belongsTo(contextModels.actors,{
    foreignKey: "ActorId"
  });
  contextModels.dockerEvents.belongsTo(contextModels.repositories,{
    foreignKey: "RepositoryId"
  });
  contextModels.dockerEvents.belongsTo(contextModels.targets,{
    foreignKey: "TargetId"
  });
  contextModels.dockerEvents.belongsTo(contextModels.requests,{
    foreignKey: "RequestId"
  });
  contextModels.dockerEvents.belongsTo(contextModels.sources,{
    foreignKey: "SourceId"
  });

  contextModels.tags.hasMany(contextModels.targets, {
    foreignKey: "TagId"
  });
  contextModels.repositories.hasMany(contextModels.targets, {
    foreignKey: "RepositoryId"
  });
  contextModels.targets.belongsTo(contextModels.tags,{
    foreignKey: "TagId"
  });
  contextModels.targets.belongsTo(contextModels.repositories,{
    foreignKey: "RepositoryId"
  });

  contextModels.tags.belongsToMany(contextModels.repositories,{
    through: contextModels.repositories_tags
  });
  contextModels.repositories.belongsToMany(contextModels.tags,{
    through: contextModels.repositories_tags
  });
}

exports.test = function() {
  return sequelize;
}
