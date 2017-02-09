var sequelize = require('sequelize');
var exports = module.exports = {};
exports.create = function(context) {
  return context.define('Targets', {
    Id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Size: {
      type: sequelize.INTEGER,
    },
    Digest: {
      type: sequelize.STRING
    },
    RepositoryId: {
      type: sequelize.INTEGER
    },
    Url: {
      type: sequelize.STRING
    },
    TagId: {
      type: sequelize.INTEGER
    },
  }, {
    timestamps: false,
    freezeTableName: true
  })
}
