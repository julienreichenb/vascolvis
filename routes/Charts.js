const express = require('express')
const cors = require('cors')
const charts = express.Router()

const Chart = require('../models/Chart')
const Annotation = require('../models/Annotation')
charts.use(cors())

process.env.SECRET_KEY = 'secret'

/*
 ** SAVE CHART
 */
charts.post('/save', (req, res) => {
  const url = generateUrl(15)
  const name = req.body.name === '' ? url : req.body.name
  const chartData = {
    name,
    data: req.body.data,
    id_dataset: req.body.id_dataset,
    id_user: req.body.id_user,
    public: req.body.public,
    url
  }
  Chart.create(chartData)
    .then((chart) => {
      res.status(200).json(chart)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** GET SINGLE CHART BY ID
 */
charts.get('/id', (req, res) => {
  const id = req.query.id
  Chart.findOne({
    where: {
      id
    },
    include: Annotation
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
charts.get('/', (req, res) => {
  const url = req.query.url
  Chart.findOne({
    where: {
      url
    },
    include: Annotation
  })
    .then((chart) => {
      res.status(200).json(chart)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** GET ALL CHARTS
 */
charts.get('/all', (req, res) => {
  Chart.findAll()
    .then((charts) => {
      res.status(200).json(charts)
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
      res.status(400).json({ error })
    })
})

/*
 ** GET CHART URL FROM ID
 */
charts.get('/url', (req, res) => {
  Chart.findOne({
    where: {
      id: req.query.id
    }
  })
    .then((chart) => {
      res.status(200).json({ id: chart.id, url: chart.url, name: chart.name })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** GET CHART NUMBER FOR A DATASET
 */
charts.get('/nb', (req, res) => {
  Chart.findAll({
    where: {
      id_dataset: req.query.dataset
    }
  })
    .then((charts) => {
      if (charts) {
        res.status(200).json(charts.length)
      } else {
        res.status(200).json(null)
      }
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** DELETE A CHART WITH ID
 */
charts.delete('/', (req, res) => {
  Chart.destroy({
    where: {
      id: req.query.id
    }
  })
    .then((rowDeleted) => {
      // rowDeleted will return number of rows deleted
      if (rowDeleted === 1) {
        Annotation.destroy({
          where: {
            id_chart: req.query.id
          }
        }).then(() => {
          res.send('Success')
        })
      }
    })
    .catch((err) => {
      res.send(err)
    })
})

/*
 ** UPDATE A CHART WITH ID
 */
charts.put('/', (req, res) => {
  Chart.update(
    { name: req.query.name, public: req.query.public },
    { where: { id: req.query.id } }
  )
    .then(() => {
      Chart.findOne({
        where: {
          id: req.query.id
        }
      }).then((chart) => {
        res.status(200).json(chart)
      })
    })
    .catch((err) => {
      res.send(err)
    })
})

/*
 ** GENERATE A RANDOM URL OF 15 CHARS
 */
function generateUrl(length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

module.exports = charts
