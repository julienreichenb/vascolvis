const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
  'workspace_variables',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_workspace: {
      type: Sequelize.INTEGER,
      references: 'workspaces', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    },
    id_variable: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
)
