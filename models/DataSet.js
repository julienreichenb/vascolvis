const Sequelize = require('sequelize')
const db = require('../database/db')
const Chart = require('./Chart')
const Workspace = require('./Workspace')

const DataSet = db.sequelize.define(
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
      type: Sequelize.JSON
    },
    size: {
      type: Sequelize.FLOAT
    },
    id_user: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    timestamps: false
  }
)
// Associations
DataSet.hasMany(Chart, { foreignKey: 'id_dataset' })
Chart.belongsTo(DataSet, { foreignKey: 'id_dataset' })
DataSet.hasMany(Workspace, { foreignKey: 'id_dataset' })
Workspace.belongsTo(DataSet, { foreignKey: 'id_dataset' })

module.exports = DataSet
