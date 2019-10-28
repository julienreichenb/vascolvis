const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

/*
 ** REGISTER
 */
users.post('/register', (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password
  }

  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then((user) => {
      if (!user) {
        userData.password = req.body.password
        User.create(userData)
          .then((user) => {
            const token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              expiresIn: 7200
            })
            res.send(token)
          })
          .catch((error) => {
            res.status(400).json({ error: 'Something wrong happened...' })
          })
      } else {
        res.status(400).json({ error: 'User already exists' })
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
            error: 'Impossible to log in (username or password invalid)'
          })
        }
      }
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

module.exports = users
