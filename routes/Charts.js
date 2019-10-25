const express = require('express')
const cors = require('cors')
const charts = express.Router()

const Chart = require('../models/Chart')
charts.use(cors())

process.env.SECRET_KEY = 'secret'

/*
 ** SAVE CHART
 */
charts.post('/save', (req, res) => {
  const chartData = {
    name: req.body.name,
    data: req.body.data,
    id_dataset: req.body.id_dataset,
    url: req.body.url
  }
  Chart.create(chartData)
    .then((chart) => {
      res.status(200).json(chart)
    })
    .catch((error) => {
      res.status(400).json({ error: 'Something wrong happened...' })
    })
})

/*
 ** GET SINGLE CHART BY ID
 */
charts.get('/id', (req, res) => {
  const id = req.query.id
  Chart.findOne({
    where: {
      id: id
    }
  })
    .then((chart) => {
      res.status(200).json(chart)
    })
    .catch((error) => {
      res.status(400).json({ error: 'Something wrong happened...' })
    })
})

/*
 ** GET SINGLE CHART BY URL
 */
charts.get('/url', (req, res) => {
  const url = req.query.url
  Chart.findOne({
    where: {
      url: url
    }
  })
    .then((chart) => {
      res.status(200).json(chart)
    })
    .catch((error) => {
      res.status(400).json({ error: 'Something wrong happened...' })
    })
})

/*
 ** GET ALL CHARTS FROM A USER
 */
charts.get('/user', (req, res) => {
  const user = req.query.id_user
  Chart.findAll({
    where: {
      id_user: user
    }
  })
    .then((charts) => {
      res.status(200).json(charts)
    })
    .catch((error) => {
      res.status(400).json({ error: 'Something wrong happened...' })
    })
})

module.exports = charts
