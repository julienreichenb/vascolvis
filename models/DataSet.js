const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
  'datasets',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    data: {
      type: Sequelize.BLOB
    },
    id_user: {
      type: Sequelize.INTEGER,
      references: 'users', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    }
  },
  {
    timestamps: false
  }
)
