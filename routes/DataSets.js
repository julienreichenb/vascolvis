const fs = require('fs')
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const csv = require('fast-csv')
const datasets = express.Router()
const upload = multer({ dest: 'tmp/csv/' })

const DataSet = require('../models/DataSet')
datasets.use(cors())

process.env.SECRET_KEY = 'secret'

/*
 ** SAVE DATASET
 */
datasets.post('/save', (req, res) => {
  const datasetData = {
    name: req.body.name,
    data: req.body.data,
    id_user: req.body.id_user
  }
  DataSet.create(datasetData)
    .then((dataset) => {
      res.status(200).json(dataset)
    })
    .catch((error) => {
      res.status(400).json({ error: 'Something wrong happened...' })
    })
})

/*
 ** GET SAMPLE DATA
 */
datasets.get('/sample', (req, res) => {
  DataSet.findOne({
    where: {
      id: 1
    }
  })
    .then((dataset) => {
      res.status(200).json(dataset)
    })
    .catch((error) => {
      res.status(400).json({ error: 'Something wrong happened...' })
    })
})

/*
 ** GET SINGLE DATA
 */
datasets.get('/single', (req, res) => {
  const id = req.query.id
  DataSet.findOne({
    where: {
      id: id
    }
  })
    .then((dataset) => {
      res.status(200).json(dataset)
    })
    .catch((error) => {
      res.status(400).json({ error: 'Something wrong happened...' })
    })
})

module.exports = datasets
