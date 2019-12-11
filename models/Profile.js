const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
  'profiles',
  {
    id_user: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    publicname: {
      type: Sequelize.STRING
    },
    bio: {
      type: Sequelize.TEXT
    },
    url: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)
