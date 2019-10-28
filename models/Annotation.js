const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
  'annotations',
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
      type: Sequelize.JSON
    },
    id_user: {
      type: Sequelize.INTEGER,
      references: 'users', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    },
    id_chart: {
      type: Sequelize.INTEGER,
      references: 'charts', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    }
  },
  {
    timestamps: false
  }
)