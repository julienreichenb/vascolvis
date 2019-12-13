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
  Workspace.findAll(
    { raw: true },
    {
      where: {
        id_user: req.query.id_user
      },
      $and: [
        {
          id_dataset: req.query.id_dataset
        }
      ]
    }
  )
    .then((workspaces) => {
      if (workspaces) {
        for (let i = 0; i < workspaces.length; i++) {
          const variableSet = []
          Variables.findAll(
            { raw: true },
            { where: { id_workspace: workspaces[i].id } }
          )
            .then((variables) => {
              if (variables) {
                for (let i = 0; i < variables.length; i++) {
                  variableSet.push(variables[i])
                }
              }
            })
            .catch((err) => {
              res.status(400).json({ err })
            })
          workspaces[i].variables = variableSet
        }
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
        const formattedWS = []
        for (let i = 0; i < workspaces.length; i++) {
          formattedWS.push({
            id: workspaces[i].id,
            name: workspaces[i].name,
            id_user: workspaces[i].id_user,
            id_dataset: workspaces[i].id_dataset,
            variables: []
          })
          Variables.findAll({ where: { id_workspace: workspaces[i].id } }).then(
            (variables) => {
              console.log(formattedWS[i])
              for (let j = 0; j < variables.length; j++) {
                formattedWS[i].variables.push(variables[j].id_variable)
              }
            }
          )
        }
        res.status(200).json(formattedWS)
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
  const variables = JSON.parse(req.body.variables)
  const workspaceData = {
    name: req.body.name,
    id_user: req.body.id_user,
    id_dataset: req.body.id_dataset
  }
  Workspace.create(workspaceData)
    .then((workspaceData) => {
      for (let i = 0; i < variables.length; i++) {
        const idvariable = Number.parseInt(variables[i])
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

module.exports = workspaces
