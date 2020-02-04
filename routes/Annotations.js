const express = require('express')
const cors = require('cors')
const annotations = express.Router()

const Annotation = require('../models/Annotation')
const Comment = require('../models/Comment')
const Chart = require('../models/Chart')
const User = require('../models/User')
annotations.use(cors())

process.env.SECRET_KEY = 'secret'

/*
 ** SAVE ANNOTATION
 */
annotations.post('/', (req, res) => {
  const annotationData = {
    data: req.body.data,
    id_chart: req.body.id_chart,
    id_user: req.body.id_user,
    parent_annotation: req.body.parent_annotation
  }
  Annotation.create(annotationData)
    .then((annotation) => {
      res.status(200).json(annotation)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** GET SINGLE ANNOTATION BY ID
 */
annotations.get('/id', (req, res) => {
  const id = req.query.id
  Annotation.findOne({
    where: {
      id
    },
    include: Comment
  })
    .then((annotation) => {
      res.status(200).json(annotation)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** GET ALL ANNOTATIONS FROM A USER
 */
annotations.get('/user', (req, res) => {
  const user = req.query.id_user
  Annotation.findAll({
    where: {
      id_user: user
    }
  })
    .then((annotations) => {
      res.status(200).json(annotations)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** GET ALL ANNOTATIONS FOR A CHART
 */
annotations.get('/chart', (req, res) => {
  const id_chart = req.query.id
  Annotation.findAll({
    where: {
      id_chart
    },
    attributes: ['id', 'data', 'parent_annotation'],
    include: [
      { model: Chart, attributes: ['id', 'name', 'url'] },
      { model: User, attributes: ['id', 'username'] }
    ]
  })
    .then((annotations) => {
      res.status(200).json(annotations)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** GET ROOT ANNOTATIONS FOR A CHART
 */
annotations.get('/roots', (req, res) => {
  const id_chart = req.query.id_chart
  Annotation.findAll({
    where: {
      id_chart,
      parent_annotation: 0
    },
    attributes: ['id', 'data', 'parent_annotation'],
    include: [
      { model: Chart, attributes: ['id', 'name', 'url'] },
      { model: User, attributes: ['id', 'username'] }
    ]
  })
    .then((annotations) => {
      res.status(200).json(annotations)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** GET REPLIES
 */
annotations.get('/replies', (req, res) => {
  const parent_annotation = req.query.parent
  Annotation.findAll({
    where: {
      parent_annotation
    },
    attributes: ['id', 'data', 'parent_annotation'],
    include: [
      { model: Chart, attributes: ['id', 'name', 'url'] },
      { model: User, attributes: ['id', 'username'] }
    ]
  })
    .then((annotations) => {
      res.status(200).json(annotations)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** GET NB OF ANNOTATIONS FOR A CHART
 */
annotations.get('/nb', (req, res) => {
  Annotation.findAll({
    where: {
      id_chart: req.query.chart
    }
  })
    .then((annotations) => {
      if (annotations) {
        res.status(200).json(annotations.length)
      } else {
        res.status(200).json(null)
      }
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** DELETE A ANNOTATION WITH ID
 */
annotations.delete('/', (req, res) => {
  Annotation.destroy({
    where: {
      id: req.query.id
    }
  })
    .then((rowDeleted) => {
      // rowDeleted will return number of rows deleted
      if (rowDeleted === 1) {
        Comment.destroy({
          where: {
            id_annotation: req.query.id
          }
        })
          .then(() => {
            res.send('Success')
          })
          .catch((err) => {
            res.send(err)
          })
      }
    })
    .catch((err) => {
      res.send(err)
    })
})

module.exports = annotations
