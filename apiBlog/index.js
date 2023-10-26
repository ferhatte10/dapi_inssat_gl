const app = require('express')()
const db = require('./configs/db/config/db')
const {PORT} = require('./configs/env')


const { setupCors } = require('./configs/cors')
const { setupLogging } = require("./configs/logging")
const { setUpDocumentation } = require("./configs/openApi")
const { setupBasics } = require('./configs/resReqConf')


const port = PORT || 3000


setupLogging(app) // This will log all requests to the console
setUpDocumentation(app) // This will serve the documentation
setupCors(app) // This will setup cors
setupBasics(app) // This will setup the basics for the app as body parser and urlencoded ...


db.dbInstance.sync().then(() => { // This will sync the database with the models (update any changes) 
    console.log("Database is synced")
}).catch((err) => {
    console.log(err)
})

app.get('/api_blog', (req, res) => {
  res.status(200).json({"success": true,"message": {
    "message": "Welcome to the blog api",
    "documentation": `${req.originalUrl}api-doc`,
  }})
})

app.use('/api_blog/blog', require('./routes/blog'))

app.use(`*`, (req, res) => { 
  res.status(404).json({"success": false,"message": "Endpoint doesn't exists"}) 
})


app.listen(port, () => {
  console.log(`Api-blog listening on port ${port}`)
})

exports.default = app