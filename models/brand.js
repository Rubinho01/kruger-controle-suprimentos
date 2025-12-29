const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const brand = sequelize.define('brands', {
   id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
   },
   name: {
    type: DataTypes.STRING,
    allowNull: false
   }
});

module.exports = brand;