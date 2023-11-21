const app = require('express')()
const {secure, getJwksService} = require("./configs/auth")
const {PORT} = require('./configs/env')
const { setupCors } = require('./configs/cors')
const { setupLogging } = require("./configs/logging")
const { setUpDocumentation } = require("./configs/openApi")
const { setupBasics } = require('./configs/resReqConf')
const { setupDatabase } = require('./configs/syncDatabase')

const port = PORT || 3000


setupLogging(app) // This will log all requests to the console
setUpDocumentation(app) // This will serve the documentation
setupCors(app) // This will setup cors
setupBasics(app) // This will setup the basics for the app as body parser and urlencoded ...
setupDatabase() // This will sync the database with the models (update any changes) and seed the database with the data

app.get('/api_blog',
    (req, res) =>
    {
      return res.status(200).json(
          {
            success: true,
            message: {
              message: 'Welcome to the blog api',
              documentation: `${req.originalUrl}api-doc`
            },
          });
    }
)

app.use('/api_blog',secure(getJwksService()), require('./routes'))

app.use(`*`, (req, res) => { 
  res.status(404).json({error: "Endpoint doesn't exists"})
})


app.listen(port, () => {
  console.log(`Api-blog listening on port ${port}`)
})

