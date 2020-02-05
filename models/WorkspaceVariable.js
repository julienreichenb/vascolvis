const db = require('../database/db')
const Sequelize = require('sequelize')

const WorkspaceVariable = db.sequelize.define(
  'workspace_variables',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_workspace: {
      type: Sequelize.INTEGER,
      references: {
        model: 'workspaces',
        key: 'id'
      }
    },
    id_variable: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
)

module.exports = WorkspaceVariable
