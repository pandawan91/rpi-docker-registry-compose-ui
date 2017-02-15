var exports = module.exports = {};

exports.sendToDatabase = function(eventObj, context){
  if(eventObj === null) throw "eventObj is null";
  if(context === null) throw "context is null";

  context.models.DockerEvents
    .create({
      Stamp: eventObj["timestamp"]
  }).then((event) => {
      context.models.Actions.findOrCreate({
        where: {Name: eventObj["action"]},
        defaults: {Name: eventObj["action"]}
      }).spread((action, create) => {
        event.setDataValue("ActionId", action.getDataValue("Id"));
        event.save();
      });

      context.models.Actors.findOne({
        where: {Name: eventObj["actor"].name}
      }).then((actor) => {
        if(actor === null)
          context.models.Actors.findOrCreate({
            where: {Name: "anonymous"},
            defaults: "anonymous"
          }).spread((anonymous, creadted) => {
            event.setDataValue("ActorId", anonymous.getDataValue("Id"));
            event.save();
          })
      });

      context.models.Requests.create({
        Addr: eventObj["request"].addr,
        Host: eventObj["request"].host
      }).then((request) => {
        event.setDataValue("RequestId", request.getDataValue("Id"));
        event.save();
      });

      context.models.Tags.findOrCreate({
        where: {Name: eventObj["target"].tag},
        defaults: {Name: eventObj["target"].tag}
      }).spread((tag, created) => {
        context.models.Repositories.findOrCreate({
          where: {Name: eventObj["target"].repository},
          defaults: {
            Name: eventObj["target"].repository,
            Active: true
          }
        }).spread((repo, created) => {
          context.models.Repositories-Tags.findOrCreate({
            where: {
              TagId: tag.Id,
              RepositoryId: repo.Id
            },
            defaults: {
              TagId: tag.Id,
              RepositoryId: repo.Id
            }
          }).spread((repo_tags, created) => {

          });

          event.setDataValue(
            "RepositoryId",
            repo.getDataValue("Id"));
          event.save();
          context.models.Targets.create({
            Size: eventObj["target"].size,
            Digest: eventObj["target"].digest,
            RepositoryId: repo.getDataValue("Id"),
            Url: eventObj["target"].url,
            TagId: tag.getDataValue("Id")
          }).then((target) => {
            event.setDataValue("TargetId", target.getDataValue("Id"));
            event.save();
          });
        });
      });

      context.models.Sources.create({
        Addr: eventObj["source"].addr,
        InstanceId: eventObj["source"].instanceId
      }).then((source) => {
        event.setDataValue("SourceId", source.getDataValue("Id"));
        event.save();
      });
  });
};
