const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
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
      references: 'users', // <<< Note, its table's name, not object name
      referencesKey: 'id', // <<< Note, its a column name
      nullable: true
    },
    username: {
      type: Sequelize.STRING,
      nullable: true
    },
    id_annotation: {
      type: Sequelize.INTEGER,
      references: 'annotations', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    }
  },
  {
    timestamps: false
  }
)
