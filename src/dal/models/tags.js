var sequelize = require('sequelize');
var exports = module.exports = {};
exports.create = function(context) {
  return context.define('Tags', {
    Id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Name: {
      type: sequelize.STRING
    }
  }, {
    timestamps: false,
    freezeTableName: true
  })
}
