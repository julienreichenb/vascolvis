const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    defaultpublic: {
      type: Sequelize.TINYINT
    },
    password: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)
