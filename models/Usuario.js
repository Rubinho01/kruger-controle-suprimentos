
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const usuario = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type:DataTypes.STRING,
        allowNull: false}
});

module.exports = usuario;