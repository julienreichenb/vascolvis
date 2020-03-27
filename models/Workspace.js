const Sequelize = require('sequelize')
const db = require('../database/db')
const WorkspaceVariable = require('./WorkspaceVariable')

const Workspace = db.sequelize.define(
  'workspaces',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    id_user: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    id_dataset: {
      type: Sequelize.INTEGER,
      references: {
        model: 'datasets',
        key: 'id'
      }
    }
  },
  {
    timestamps: false
  }
)
// Associations
Workspace.hasMany(WorkspaceVariable, { foreignKey: 'id_workspace' })
WorkspaceVariable.belongsTo(Workspace, { foreignKey: 'id_workspace' })

module.exports = Workspace
