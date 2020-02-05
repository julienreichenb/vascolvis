const db = require('../database/db')
const Annotation = require('./Annotation')
const Sequelize = require('sequelize')

const Chart = db.sequelize.define(
  'charts',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: Sequelize.STRING,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    },
    data: {
      type: Sequelize.JSON
    },
    public: {
      type: Sequelize.TINYINT
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
Chart.hasMany(Annotation, { foreignKey: 'id_chart' })
Annotation.belongsTo(Chart, { foreignKey: 'id_chart' })

module.exports = Chart
