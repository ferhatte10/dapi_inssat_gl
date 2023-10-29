module.exports = {
    paths:{
        '/tags':{
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