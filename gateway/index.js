const app = require('express')()

const { ROUTES } = require("./config/routes")
const { setupLogging } = require("./config/logging")
//const {setupRateLimit} = require("./config/ratelimit")
const { setupProxies } = require("./config/proxy")
//const {setupAuth} = require("./config/auth")
const { setupBasics } = require('./config/resReqConf')

const PORT = process.env.PORT || 5000
const { getRouteFormatted } = require("./config/utils")


app.get('/', (req, res) => {

  res.status(200).json({
    "success": true, "message": {
      "message": "Welcome to the DAPI API getway",
      "api's": getRouteFormatted(req,ROUTES)
    }
  })
  
})

setupLogging(app)
//setupRateLimit(app, ROUTES)
setupProxies(app, ROUTES)
setupBasics(app) // This will setup the basics for the app as body parser and urlencoded ...

app.use(`*`, (req, res) => {
  res.status(404).json({ error: "Endpoint doesn't exists" })
})
app.listen(PORT, () => {
  console.log(`DAPI app **API getway** listening on : http://localhost:${PORT}`)
})