// models/Tour.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tour = sequelize.define('Tour', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vrImage: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Tour;
