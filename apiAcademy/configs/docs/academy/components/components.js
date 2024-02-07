const {AUTH} = require('../../../../configs/env')
const userSchemas = require("../components/user.component")
module.exports = {
    components: {
        securitySchemes: {
            AuthToken: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            },
            oAuth2ClientCredentials:{
                type:'oauth2',
                description:'Fetch the token from the auth server and use it in the header as Bearer token',
                flows:{
                    password:{
                        tokenUrl: AUTH.TOKEN_REFRESH_URL,
                        refreshUrl: AUTH.TOKEN_REFRESH_URL,
                        scopes:{}
                    }
                },
            }
        },
        schemas: {
            ...userSchemas
        }
    }
}