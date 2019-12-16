const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Profile = require('../models/Profile')
users.use(cors())

const limitedAttributes = ['id', 'username']

process.env.SECRET_KEY = 'secret'

/*
 ** REGISTER
 */
users.post('/register', (req, res) => {
  const userData = {
    username: req.body.username,
    email: req.body.email
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
        if (authenticate(user.password, req.body.password)) {
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
            if (authenticate(user.password, req.body.password)) {
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
 ** GET USER BY ID OR USERNAME
 */
users.get('/', (req, res) => {
  const id = req.query.id
  User.findOne({
    attributes: limitedAttributes,
    where: {
      id
    }
  })
    .then((user) => {
      if (user) {
        res.status(200).json(user)
      } else {
        User.findOne({
          attributes: limitedAttributes,
          where: {
            username: id
          }
        })
          .then((user) => {
            res.status(200).json(user)
          })
          .catch((error) => {
            res.status(400).json({ error })
          })
      }
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** GET ALL USERS
 */
users.get('/all', (req, res) => {
  User.findAll({ attributes: limitedAttributes, raw: true })
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      res.status.json({ error })
    })
})

/*
 ** GET USER & PUBLIC NAME BY ID
 */
users.get('/names', (req, res) => {
  const id = req.query.id
  User.findOne({
    where: {
      id
    }
  })
    .then((user) => {
      if (user) {
        Profile.findOne({
          where: {
            id_user: id
          }
        })
          .then((profile) => {
            if (profile) {
              res.status(200).json({
                id: user.id,
                username: user.username,
                publicname: profile.publicname
              })
            } else {
              res.status(200).json({
                id: user.id,
                username: user.username,
                publicname: null
              })
            }
          })
          .catch((err) => {
            res.status(200).json({
              id: user.id,
              username: user.username,
              publicname: null
            })
          })
      } else {
        res.status(200).json(null)
      }
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** UPDATE USER
 */
users.put('/', (req, res) => {
  if (req.body.newpassword) {
    // New password
    User.findOne({
      where: {
        id: req.body.id
      }
    })
      .then((user) => {
        if (authenticate(user.password, req.body.oldpassword)) {
          User.update(
            {
              password: encryptPassword(req.body.newpassword)
            },
            { where: { id: req.body.id } }
          ).then((data) => {
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
        } else {
          res.status(400).json({ error: 'invalid_password' })
        }
      })
      .catch((error) => {
        res.status(400).json({ error })
      })
  } else {
    // Other user editing
    User.update(
      {
        username: req.body.username,
        email: req.body.email,
        defaultpublic: req.body.defaultpublic
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
  }
})

/*
 ** DELETE USER
 */
users.delete('/', (req, res) => {
  User.findOne({
    where: {
      id: req.query.id
    }
  })
    .then((user) => {
      if (user) {
        if (authenticate(user.password, req.query.password)) {
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
                }).then(() => {
                  if (userDeleted === 1) {
                    res.send('Success')
                  }
                })
              }
            })
            .catch((error) => {
              res.status(400).json({ error })
            })
        } else {
          res.status(400).json({ error: 'invalid' })
        }
      }
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** PASSWORD ENCRYPTION
 */
function encryptPassword(psw) {
  return bcrypt.hashSync(psw, 10)
}

/*
 ** PASSWORDS COMPARISON
 */
function authenticate(hash, password) {
  return bcrypt.compareSync(password, hash)
}

module.exports = users
