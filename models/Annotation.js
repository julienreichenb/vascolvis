const Sequelize = require('sequelize')
const db = require('../database/db')

const Annotation = db.sequelize.define(
  'annotations',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    data: {
      type: Sequelize.JSON
    },
    parent_annotation: {
      type: Sequelize.INTEGER,
      references: {
        model: 'annotations',
        key: 'id'
      },
      nullable: true
    },
    id_user: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    id_chart: {
      type: Sequelize.INTEGER,
      references: {
        model: 'charts',
        key: 'id'
      }
    }
  },
  {
    timestamps: true
  }
)

module.exports = Annotation
