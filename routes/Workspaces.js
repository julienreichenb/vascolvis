const express = require('express')
const cors = require('cors')
const workspaces = express.Router()

const Workspace = require('../models/Workspace')
const Variables = require('../models/WorkspaceVariable')

workspaces.use(cors())

process.env.SECRET_KEY = 'secret'

/*
 ** GET SINGLE WORKSPACE
 */
workspaces.get('/', (req, res) => {
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

/*
 ** GET WORKSPACES FOR A USER AND A DATASET
 */
workspaces.get('/dataset', (req, res) => {
  const user = req.query.user
  const dataset = req.query.dataset
  const allVariables = []
  Variables.findAll({ raw: true }).then((variables) => {
    if (variables) {
      for (let i = 0; i < variables.length; i++) {
        allVariables.push(variables[i])
      }
    }
  })
  Workspace.findAll({
    where: {
      id_user: user,
      id_dataset: dataset
    }
  })
    .then((workspaces) => {
      if (workspaces) {
        const allWs = []
        for (let i = 0; i < workspaces.length; i++) {
          const ws = {
            id: workspaces[i].id,
            name: workspaces[i].name,
            id_user: workspaces[i].id_user,
            id_dataset: workspaces[i].id_dataset,
            variables: []
          }
          for (let j = 0; j < allVariables.length; j++) {
            if (allVariables[j].id_workspace === ws.id) {
              ws.variables.push(allVariables[j].id_variable)
            }
          }
          allWs.push(ws)
        }
        res.status(200).json(allWs)
      } else {
        res.status(200).json(null)
      }
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

/*
 ** GET ALL WORKSPACES FOR A USER
 */
workspaces.get('/user', (req, res) => {
  Workspace.findAll({
    where: {
      id_user: req.query.id_user
    }
  })
    .then((workspaces) => {
      if (workspaces) {
        res.status(200).json(workspaces)
      } else {
        res.status(200).json(null)
      }
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** GET WORKSPACE NUMBER FOR A DATASET
 */
workspaces.get('/nb', (req, res) => {
  Workspace.findAll({
    where: {
      id_dataset: req.query.dataset
    }
  })
    .then((workspaces) => {
      if (workspaces) {
        res.status(200).json(workspaces.length)
      } else {
        res.status(200).json(null)
      }
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** SAVE WORKSPACE
 */
workspaces.post('/save', (req, res) => {
  const variables = req.body.variables
  const workspaceData = {
    name: req.body.name,
    id_user: req.body.id_user,
    id_dataset: req.body.id_dataset
  }
  Workspace.create(workspaceData)
    .then((workspaceData) => {
      for (let i = 0; i < variables.length; i++) {
        const idvariable = variables[i]
        const variableData = {
          id_workspace: workspaceData.id,
          id_variable: idvariable
        }
        Variables.create(variableData)
          .then(() => {})
          .catch((err) => {
            res.status(400).json({ err })
          })
      }
      res.status(200).json(workspaceData)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

/*
 ** DELETE WORKSPACE
 */
workspaces.delete('/', (req, res) => {
  Workspace.destroy({
    where: {
      id: req.query.id
    }
  })
    .then((wsDeleted) => {
      if (wsDeleted === 1) {
        Variables.destroy({
          where: {
            id_workspace: req.query.id
          }
        })
          .then((varDeleted) => {
            res.status(200).json({ success: 'success' })
          })
          .catch((err) => {
            res.status(400).json(err)
          })
      } else {
        res.status(400).json({ error: 'error' })
      }
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

module.exports = workspaces
