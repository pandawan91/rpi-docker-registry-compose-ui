var sequelize = require('sequelize');
var exports = module.exports = {};
exports.create = function(context) {
  return context.define('Repositories', {
    Id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Name: {
      type: sequelize.STRING,
    },
    Description: {
      type: sequelize.STRING(10000)
    },
    Note: {
      type: sequelize.STRING(10000)
    },
    Active: {
      type: sequelize.BOOLEAN
    },
    TagId: {
      type: sequelize.INTEGER
    },
  }, {
    timestamps: false,
    freezeTableName: true
  })
}
