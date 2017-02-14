var sequelize = require('sequelize');
var exports = module.exports = {};
exports.create = function(context) {
  return context.define('Repositories-Tags', {
    Id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  })
}
