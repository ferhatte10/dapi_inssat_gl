const blog = require('./blog.component')
const tag = require('./tag.component')
const category = require('./category.component')
const comment = require('./comment.component')
const article = require('./article.component')
const like = require('./like.component')
const follower = require('./follower.component')


module.exports = {
    components: {
        securitySchemes: {
            AuthToken: {

                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"

            },
        },
        schemas: {
            ...blog,
            ...tag,
            ...category,
            ...comment,
            ...article,
            ...like,
            ...follower
        }
    }
}