const db = require('../database/db')
const Sequelize = require('sequelize')

const Comment = db.sequelize.define(
  'comments',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: Sequelize.TEXT
    },
    id_user: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    username: {
      type: Sequelize.STRING,
      nullable: true
    },
    id_annotation: {
      type: Sequelize.INTEGER,
      references: {
        model: 'annotations',
        key: 'id'
      }
    }
  },
  {
    timestamps: false
  }
)

module.exports = Comment
