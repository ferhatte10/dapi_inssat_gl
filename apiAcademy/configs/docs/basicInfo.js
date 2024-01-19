const {version} = require("../../package.json").version

module.exports = {
    openapi:"3.0.0",
    info:{
        version,
        title: "Dapi web service API",
        description: "Dapi's blog web service API documentation",
        contact:{
            name:"Dapi",
            email:"gl3-dapi@listes.enssat.fr",
            url:"https://enssat.fr"
        }
    }
}