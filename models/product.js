const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const { text } = require('express');

const product = sequelize.define('products', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
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
    }
});

module.exports = product;