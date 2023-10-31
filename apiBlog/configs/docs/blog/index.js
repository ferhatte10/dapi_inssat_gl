module.exports = {
    paths: {
        '/blog': {
            ...require('./blogs/getBlogs'),
            ...require('./blogs/createBlog'),
        },
        '/blog/{uuid}': {
            ...require('./blogs/getBlog'),
            // ...require('./deleteBlog'),
            // ...require('./updateBlog')
        },
        '/tag/{id}': {
            ...require('./tags/getTag'),
            ...require('./tags/createTag')
        },
        '/tag': {
            ...require('./tags/getTags'),
            ...require('./tags/updateTag'),
            ...require('./tags/deleteTag')
        },
        '/category/{id}': {
            ...require('./categories/getCategory'),
            ...require('./categories/createCategory')
        },
        '/category': {
            ...require('./categories/getCategories'),
            ...require('./categories/updateCategory'),
            ...require('./categories/deleteCategory')
        },
        '/comment/{id}': {
            ...require('./comments/getComment'),
            ...require('./comments/createComment')
        },
        '/comment': {
            ...require('./comments/getComments'),
            ...require('./comments/updateComment'),
            ...require('./comments/deleteComment')
        },
        '/article/{id}': {
            ...require('./articles/getArticle'),
            ...require('./articles/createArticle')
        },
        '/article': {
            ...require('./articles/getArticles'),
            ...require('./articles/updateArticle'),
            ...require('./articles/deleteArticle')
        },
        '/article/details': {
            ...require('./articles/getArticlesDetails')
        },
        '/like/{id}': {
            ...require('./likes/getLike'),
            ...require('./likes/createLike')
        },
        '/like': {
            ...require('./likes/getLikes'),
            ...require('./likes/updateLike'),
            ...require('./likes/deleteLike')
        },
        '/follower/{id}': {
            ...require('./followers/getFollower'),
            ...require('./followers/createFollower')
        },
        '/follower': {
            ...require('./followers/getFollowers'),
            ...require('./followers/updateFollower'),
            ...require('./followers/deleteFollower')
        }
    }
}