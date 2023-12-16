const cors = require('cors')
const {CORS_ORIGIN} = require('../configs/env')


exports.setupCors = (app) => {
    app.use(
        cors({
          origin: CORS_ORIGIN,
          methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
        })
    )
}