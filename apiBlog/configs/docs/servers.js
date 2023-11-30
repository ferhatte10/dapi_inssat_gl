module.exports = {
    servers:[
        {
            url: "http://localhost:5000/api_blog",
            description: "Local server gateway",
        },
        {
            url: "https://api.dapi-services.fr/api_blog",
            description: "Prod server gateway",
        },
        {
            url: "http://localhost:5009/api_blog",
            description: "Local server gateway",
        },
        {
            url: "http://localhost:3000/api_blog",
            description: "Local server api dev",
        }
    ]
}