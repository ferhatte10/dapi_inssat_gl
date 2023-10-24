const app = require('express')()
const db = require('./configs/db/config/db')
const {PORT} = require('./configs/env')


const { setupCors } = require('./configs/cors')
const { setupLogging } = require("./configs/logging")
const { setUpDocumentation } = require("./configs/openApi")
const { setupBasics } = require('./configs/resReqConf')

const routes = require('./routes')

const port = PORT || 3000


setupBasics(app) // This will setup the basics for the app as body parser and urlencoded ...
setupLogging(app) // This will log all requests to the console
setUpDocumentation(app) // This will serve the documentation
setupCors(app) // This will setup cors


db.dbInstance.sync().then(() => { // This will sync the database with the models (update any changes) 
    console.log("Database is synced")
}).catch((err) => {
    console.log(err)
})



app.use('/api_blog', routes)

app.use(`*`, (req, res) => { 
  res.status(404).json({"success": false,"message": "Endpoint doesn't exists"}) 
})


app.listen(port, () => {
  console.log(`Api-blog listening on port ${port}`)
})

exports.default = app