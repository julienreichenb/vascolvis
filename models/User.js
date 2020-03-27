const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('../database/db')
const Profile = require('./Profile')
const DataSet = require('./DataSet')
const Chart = require('./Chart')
const Annotation = require('./Annotation')
const Workspace = require('./Workspace')

const User = db.sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    defaultpublic: {
      type: Sequelize.TINYINT
    },
    password: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type: Sequelize.TINYINT
    }
  },
  {
    timestamps: false
  }
)
// Methods
User.prototype.authenticate = function(psw) {
  return bcrypt.compareSync(psw, this.password)
}

// Associations
User.hasOne(Profile, { foreignKey: 'id_user' })
Profile.belongsTo(User, { foreignKey: 'id_user' })
User.hasMany(DataSet, { foreignKey: 'id_user' })
DataSet.belongsTo(User, { foreignKey: 'id_user' })
User.hasMany(Chart, { foreignKey: 'id_user' })
Chart.belongsTo(User, { foreignKey: 'id_user' })
User.hasMany(Annotation, { foreignKey: 'id_user' })
Annotation.belongsTo(User, { foreignKey: 'id_user' })
User.hasMany(Workspace, { foreignKey: 'id_user' })
Workspace.belongsTo(User, { foreignKey: 'id_user' })

module.exports = User
