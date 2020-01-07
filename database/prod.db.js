const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('vascolvis', 'iig', 'password', {
  host: '153.109.124.34',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    socketPath: '/var/run/mysqld/mysqld.sock'
  },
  define: {
    paranoid: true
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
