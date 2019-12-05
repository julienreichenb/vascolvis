const express = require('express')
const cors = require('cors')
const workspaces = express.Router()

const Workspace = require('../models/Workspace')
workspaces.use(cors())

process.env.SECRET_KEY = 'secret'

/*
 ** SAVE DATASET
 */
workspaces.post('/save', (req, res) => {
  const workspaceData = {
    name: req.body.name,
    id_user: req.body.id_user
  }
  Workspace.create(workspaceData)
    .then((workspaceData) => {
      res.status(200).json(workspaceData)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** GET SINGLE DATA
 */
workspaces.get('/single', (req, res) => {
  const id = req.query.id
  Workspace.findOne({
    where: {
      id
    }
  })
    .then((workspace) => {
      res.status(200).json(workspace)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

module.exports = workspaces
