const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const { text } = require('express');

const product = sequelize.define('products', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    quantity: {
        allowNull: false,
        type: DataTypes.STRING
    },
    lastPrice: {
        allowNull: true,
        type: DataTypes.STRING
    },
    orded: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = product;