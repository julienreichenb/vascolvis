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
        res.status(400).json({ error: 'already_exist' })
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
        res.status(400).json({
          error: 'invalid'
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

module.exports = users
