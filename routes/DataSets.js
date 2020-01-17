const express = require('express')
const cors = require('cors')
const datasets = express.Router()

const DataSet = require('../models/DataSet')
const Workspace = require('../models/Workspace')
const Variables = require('../models/WorkspaceVariable')
datasets.use(cors())

process.env.SECRET_KEY = 'secret'

/*
 ** SAVE DATASET
 */
datasets.post('/save', (req, res) => {
  const datasetData = {
    name: req.body.name,
    data: req.body.data,
    size: req.body.size,
    id_user: req.body.id_user
  }
  DataSet.create(datasetData)
    .then((dataset) => {
      res.status(200).json(dataset)
    })
    .catch((err) => {
      res.status(400).json({ error: 'failed_to_save' })
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
      res.status(400).json({ error })
    })
})

/*
 ** GET SINGLE DATA
 */
datasets.get('/single', (req, res) => {
  const id = req.query.id
  DataSet.findOne({
    where: {
      id
    }
  })
    .then((dataset) => {
      res.status(200).json(dataset)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** GET ALL DATASETS FROM A USER
 */
datasets.get('/user', (req, res) => {
  const user = req.query.id_user
  DataSet.findAll({
    where: {
      id_user: user
    }
  })
    .then((datasets) => {
      res.status(200).json(datasets)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** DELETE A DATASET WITH ID
 */
datasets.delete('/', (req, res) => {
  DataSet.destroy({
    where: {
      id: req.query.id
    }
  })
    .then((rowDeleted) => {
      // rowDeleted will return number of rows deleted
      if (rowDeleted === 1) {
        Workspace.findAll({
          where: {
            id_dataset: req.query.id
          }
        }).then((workspaces) => {
          if (workspaces) {
            for (let i = 0; i < workspaces.length; i++) {
              const id = workspaces[i].id
              Variables.destroy({
                where: {
                  id_workspace: id
                }
              }).then(() => {
                Workspace.destroy({
                  where: {
                    id
                  }
                })
              })
            }
          }
        })
      }
    })
    .catch((err) => {
      res.send(err)
    })
})

/*
 ** UPDATE A DATASET WITH ID
 */
datasets.put('/', (req, res) => {
  DataSet.update({ name: req.query.name }, { where: { id: req.query.id } })
    .then(() => {
      DataSet.findOne({
        where: {
          id: req.query.id
        }
      }).then((dataset) => {
        res.status(200).json(dataset)
      })
    })
    .catch((err) => {
      res.send(err)
    })
})

module.exports = datasets
