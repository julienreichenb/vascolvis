const express = require('express')
const profiles = express.Router()
const cors = require('cors')

const Profile = require('../models/Profile')
profiles.use(cors())

process.env.SECRET_KEY = 'secret'

/*
 ** GET PROFILE BY ID
 */
profiles.get('/', (req, res) => {
  const id = req.query.id
  Profile.findOne({
    where: {
      id_user: id
    }
  })
    .then((profile) => {
      res.status(200).json(profile)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** GET ALL PROFILES
 */

profiles.get('/all', (req, res) => {
  Profile.findAll({ raw: true })
    .then((profiles) => {
      res.status(200).json(profiles)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** UPDATE PROFILE
 */
profiles.put('/', (req, res) => {
  Profile.update(
    {
      publicname: req.body.publicname,
      bio: req.body.bio,
      url: req.body.url
    },
    {
      where: {
        id_user: req.body.id
      }
    }
  )
    .then((data) => {
      Profile.findOne({
        where: {
          id_user: req.body.id
        }
      }).then((profile) => {
        res.send(profile)
      })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

module.exports = profiles
