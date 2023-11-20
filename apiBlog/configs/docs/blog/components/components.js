const tag = require('./tag.component')
const category = require('./category.component')
const comment = require('./comment.component')
const article = require('./article.component')
const like = require('./like.component')
const follower = require('./follower.component')
const {AUTH} = require('../../../../configs/env')

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
            ...tag,
            ...category,
            ...comment,
            ...article,
            ...like,
            ...follower
        }
    }
}