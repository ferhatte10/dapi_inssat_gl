module.exports = {
    paths:{
        '/users':{
            ...require('./getBlogs'),
            ...require('./createBlog'),
        },
        '/blog/{uuid}':{
            ...require('./getBlog'),
            // ...require('./deleteBlog'),
            // ...require('./updateBlog')
        },
    }
}