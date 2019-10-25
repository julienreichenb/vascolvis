import * as Op from 'sequelize'

const express = require('express')
const cors = require('cors')
const comments = express.Router()

const Comment = require('../models/Annotation')
comments.use(cors())

process.env.SECRET_KEY = 'secret'

/*
 ** SAVE COMMENT
 */
comments.post('/save', (req, res) => {
  const commentData = {
    text: req.body.text,
    id_annotation: req.body.id_annotation,
    id_user: req.body.id_user,
    username: req.body.username
  }
  Comment.create(commentData)
    .then((comment) => {
      res.status(200).json(comment)
    })
    .catch((error) => {
      res.status(400).json({ error: 'Something wrong happened...' })
    })
})

/*
 ** GET SINGLE COMMENT BY ID
 */
comments.get('/id', (req, res) => {
  const id = req.query.id
  Comment.findOne({
    where: {
      id: id
    }
  })
    .then((comment) => {
      res.status(200).json(comment)
    })
    .catch((error) => {
      res.status(400).json({ error: 'Something wrong happened...' })
    })
})

/*
 ** GET ALL COMMENTS FROM A USER
 */
comments.get('/user', (req, res) => {
  const user = req.query.user
  Comment.findAll({
    where: {
      [Op.or]: [{ username: user }, { id_user: user }]
    }
  })
    .then((comments) => {
      res.status(200).json(comments)
    })
    .catch((error) => {
      res.status(400).json({ error: 'Something wrong happened...' })
    })
})

/*
 ** GET ALL COMMENTS FOR AN ANNOTATION
 */
comments.get('/annotation', (req, res) => {
  const annotation = req.query.id_annotation
  Comment.findAll({
    where: {
      id_annotation: annotation
    }
  })
    .then((comments) => {
      res.status(200).json(comments)
    })
    .catch((error) => {
      res.status(400).json({ error: 'Something wrong happened...' })
    })
})

module.exports = comments
