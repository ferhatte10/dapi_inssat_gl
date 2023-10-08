module.exports = {
    paths:{
        '/blog':{
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