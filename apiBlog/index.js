const app = require('express')()
const db = require('./configs/db/config/db')
const {PORT} = require('./configs/env')
const {secure, getJwksService} = require("./configs/auth")

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
let keycloak = setupKeycloak(app) // This will setup keycloak and return the instance of it to be used in other
exports.keycloak = keycloak // This will export the keycloak instance to be used in other files

// db.dbInstance.sync().then(() => { // This will sync the database with the models (update any changes)
//     console.log("Database is synced")
// }).catch((err) => {
//     console.log(err)
// })

app.use('/api_blog',secure(getJwksService()), require('./routes'))

app.use(`*`, (req, res) => { 
  res.status(404).json({error: "Endpoint doesn't exists"})
})


app.listen(port, () => {
  console.log(`Api-blog listening on port ${port}`)
})

