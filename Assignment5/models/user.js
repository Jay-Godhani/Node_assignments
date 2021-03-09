const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user' , {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;