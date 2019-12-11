const express = require('express')
const consola = require('consola')
const cors = require('cors')
const bodyParser = require('body-parser')
const { Nuxt, Builder } = require('nuxt')
const app = express()

app.use(bodyParser.json({ limit: '2mb' }))
app.use(
  bodyParser.urlencoded({
    limit: '2mb',
    extended: true,
    parameterLimit: 100000
  })
)
app.use(cors())

// DB settings
const Users = require('../routes/Users')
const Profiles = require('../routes/Profiles')
const Datasets = require('../routes/DataSets')
const Charts = require('../routes/Charts')
const Annotations = require('../routes/Annotations')
const Comments = require('../routes/Comments')
app.use('/users', Users)
app.use('/profiles', Profiles)
app.use('/datasets', Datasets)
app.use('/charts', Charts)
app.use('/annotations', Annotations)
app.use('/comments', Comments)

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
