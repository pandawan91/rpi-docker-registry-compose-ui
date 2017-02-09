var sequelize = require('sequelize');
var exports = module.exports = {};
exports.create = function(context) {
  return context.define('Requests', {
    Id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Addr: {
      type: sequelize.STRING
    },
    Host: {
      type: sequelize.STRING
    }
  }, {
    timestamps: false,
    freezeTableName: true
  })
}
