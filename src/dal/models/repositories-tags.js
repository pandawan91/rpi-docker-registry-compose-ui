var sequelize = require('sequelize');
var exports = module.exports = {};
exports.create = function(context) {
  return context.define('Repositories_Tags', {
    Id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    RepositoryId: {
      type: sequelize.INTEGER,
    },
    TagId: {
      type: sequelize.INTEGER,
    }
  }, {
    timestamps: false,
    freezeTableName: true
  })
}
