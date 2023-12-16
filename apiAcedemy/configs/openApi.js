const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const docs = require('./docs')
const {AUTH} = require('./env')


let options = {
    customCssUrl: '/api_blog/css/openapi.css',
    customSiteTitle: "API Blog documentation",
    customfavIcon: "/api_blog/images/logo.ico",
}

const specs = swaggerJsDoc({definition : docs,apis : []})



exports.setUpDocumentation = (app) => {
    
    // Documentation in JSON format
    if (app.get('env') === 'development') {
        app.get("/api_blog/doc.json", (req, res ) => {
            res.setHeader("Content-Type", "application/json")
            res.send(specs)
        })
    }

    // Serve the api documentation
    app.use("/api_blog/api-doc",swaggerUI.serve, swaggerUI.setup(docs, options))
}


