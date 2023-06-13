const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');
  
class history {
  #model = sequelize.define('histories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ronde: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    player: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    server: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hasil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      defaultValue: sequelize.literal('NOW()'),
      type: DataTypes.DATE
    } 
  }, {
    tableName: 'histories',
    updatedAt: false,
    underscored: true
  })

};

const History = new history();
module.exports = { History }