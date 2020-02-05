const db = require('../database/db')
const Sequelize = require('sequelize')

const Profile = db.sequelize.define(
  'profiles',
  {
    id_user: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      foreignKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    publicname: {
      type: Sequelize.STRING
    },
    bio: {
      type: Sequelize.TEXT
    },
    url: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)
module.exports = Profile
