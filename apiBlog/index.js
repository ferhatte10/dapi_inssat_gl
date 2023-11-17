const app = require('express')()
const db = require('./configs/db/config/db')
// const {secure, getJwksService} = require("./configs/auth")
const {PORT, SEED_ACTIVATED} = require('./configs/env')
const { seedAll } = require('./seeders');

const { setupCors } = require('./configs/cors')
const { setupLogging } = require("./configs/logging")
const { setUpDocumentation } = require("./configs/openApi")
const { setupBasics } = require('./configs/resReqConf')
const { setupKeycloak } = require('./configs/keycloakMiddlware')

const port = PORT || 3000


setupLogging(app) // This will log all requests to the console
setUpDocumentation(app) // This will serve the documentation
setupCors(app) // This will setup cors
setupBasics(app) // This will setup the basics for the app as body parser and urlencoded ...
const keycloakInstance = setupKeycloak(app) // This will setup keycloak and return the instance

db.dbInstance.sync().then(() => { // This will sync the database with the models (update any changes)
    console.log("Database is synced")
    // This will seed the database with the data
    if(SEED_ACTIVATED) seedAll()
}).catch((err) => {
    console.log(err)
})

// app.use('/api_blog',secure(getJwksService()), require('./routes'))
app.use('/api_blog',keycloakInstance.protect(), require('./routes'))

app.use(`*`, (req, res) => { 
  res.status(404).json({error: "Endpoint doesn't exists"})
})


app.listen(port, () => {
  console.log(`Api-blog listening on port ${port}`)
})

