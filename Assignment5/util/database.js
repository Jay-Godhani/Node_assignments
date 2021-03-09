const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-db', 'root', 'mysqlroot', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;