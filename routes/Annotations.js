const express = require('express')
const cors = require('cors')
const annotations = express.Router()

const Annotation = require('../models/Annotation')
annotations.use(cors())

process.env.SECRET_KEY = 'secret'

/*
 ** SAVE ANNOTATION
 */
annotations.post('/save', (req, res) => {
  const annotationData = {
    data: req.body.data,
    id_chart: req.body.id_chart,
    id_user: req.body.id_user
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
      id: id
    }
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
  const chart = req.query.id_chart
  Annotation.findAll({
    where: {
      id_chart: chart
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
 ** DELETE A ANNOTATION WITH ID
 */
annotations.delete('/', (req, res) => {
  Annotation.destroy({
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

module.exports = annotations
