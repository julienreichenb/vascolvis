const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
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
      references: 'users', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    },
    id_dataset: {
      type: Sequelize.INTEGER,
      references: 'datasets', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    }
  },
  {
    timestamps: false
  }
)
