const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const Profile = require('../models/Profile')
users.use(cors())

process.env.SECRET_KEY = 'secret'

/*
 ** REGISTER
 */
users.post('/register', (req, res) => {
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then((user) => {
      if (!user) {
        User.findOne({
          where: {
            email: req.body.email
          }
        }).then((user) => {
          if (!user) {
            userData.password = encryptPassword(req.body.password)
            User.create(userData)
              .then((user) => {
                const token = jwt.sign(
                  user.dataValues,
                  process.env.SECRET_KEY,
                  {
                    expiresIn: 7200
                  }
                )
                // Profile creation
                const profileData = {
                  id_user: user.id,
                  publicname: user.username
                }
                Profile.create(profileData).then((profile) => {
                  res.send(token)
                })
              })
              .catch((error) => {
                res.send('error : ' + error)
              })
          } else {
            res.status(400).json({ error: 'email_already_exist' })
          }
        })
      } else {
        res.status(400).json({ error: 'username_already_exist' })
      }
    })
    .catch((err) => {
      res.send('error :' + err)
    })
})

/*
 ** LOGIN
 */
users.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then((user) => {
      if (user) {
        if (req.body.password === user.password) {
          const token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 7200
          })
          res.send(token)
        } else {
          res.status(400).json({
            error: 'invalid'
          })
        }
      } else {
        User.findOne({
          where: {
            email: req.body.username
          }
        }).then((user) => {
          if (user) {
            if (req.body.password === user.password) {
              const token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                expiresIn: 7200
              })
              res.send(token)
            } else {
              res.status(400).json({
                error: 'invalid'
              })
            }
          } else {
            res.status(400).json({
              error: 'invalid'
            })
          }
        })
      }
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** GET USER BY ID
 */
users.get('/', (req, res) => {
  User.findOne({
    where: {
      id: req.query.id
    }
  })
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** UPDATE USER
 */
users.put('/', (req, res) => {
  User.update(
    {
      username: req.body.username,
      email: req.body.email,
      defaultpublic: req.body.defaultpublic,
      password: encryptPassword(req.body.password)
    },
    {
      where: {
        id: req.body.id
      }
    }
  )
    .then((data) => {
      User.findOne({
        where: {
          id: req.body.id
        }
      }).then((user) => {
        const token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 7200
        })
        res.send(token)
      })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** DELETE USER
 */
users.delete('/', (req, res) => {
  User.destroy({
    where: {
      id: req.query.id
    }
  })
    .then((userDeleted) => {
      if (userDeleted === 1) {
        Profile.destroy({
          where: {
            id_user: req.query.id
          }
        }).then((profileDeleted) => {
          if (userDeleted === 1) {
            res.send('Success')
          }
        })
      }
    })
    .catch((err) => {
      res.send(err)
    })
})

/*
 ** PASSWORD ENCRYPTION
 */

function encryptPassword(psw) {
  return psw
}

module.exports = users
