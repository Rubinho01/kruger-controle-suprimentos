
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const user = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type:DataTypes.STRING,
        allowNull: false}
});

module.exports = user;