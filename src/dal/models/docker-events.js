var sequelize = require('sequelize');
var exports = module.exports = {};
exports.create = function(context) {
  return context.define('DockerEvents', {
    Id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Stamp: {
      type: sequelize.STRING
    },
    ActionId: {
      type: sequelize.INTEGER
    },
    TargetId: {
      type: sequelize.INTEGER
    },
    RequestId: {
      type: sequelize.INTEGER
    },
    ActorId: {
      type: sequelize.INTEGER
    },
    SourceId: {
      type: sequelize.INTEGER
    },
    RepositoryId: {
      type: sequelize.INTEGER
    }
  }, {
    timestamps: false,
    freezeTableName: true
  })
}
