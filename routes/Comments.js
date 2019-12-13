const express = require('express')
const cors = require('cors')
const comments = express.Router()

const Comment = require('../models/Comment')
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
      res.status(400).json({ error })
    })
})

/*
 ** GET SINGLE COMMENT BY ID
 */
comments.get('/id', (req, res) => {
  const id = req.query.id
  Comment.findOne({
    where: {
      id
    }
  })
    .then((comment) => {
      res.status(200).json(comment)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** GET ALL COMMENTS FROM A USER
 */
comments.get('/user', (req, res) => {
  const user = req.query.id_user
  Comment.findAll({
    where: {
      id_user: user
    }
  })
    .then((comments) => {
      res.status(200).json(comments)
    })
    .catch((error) => {
      res.status(400).json({ error })
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
      res.status(400).json({ error })
    })
})

/*
 ** DELETE A COMMENT WITH ID
 */
comments.delete('/', (req, res) => {
  Comment.destroy({
    where: {
      id: req.query.id
    }
  }).then(
    function(rowDeleted) {
      // rowDeleted will return number of rows deleted
      if (rowDeleted === 1) {
        res.send('Success')
      }
    },
    function(err) {
      res.send(err)
    }
  )
})

module.exports = comments
