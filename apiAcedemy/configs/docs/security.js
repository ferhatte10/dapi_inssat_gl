module.exports = {
    security: [ // only if we want to add the token to all endpoints
        {
            AuthToken: [],
            oAuth2ClientCredentials: []
        },
    ]
}