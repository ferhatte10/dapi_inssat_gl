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
<<<<<<< HEAD
        '/tags/{id}': {
            ...require('./tags/getTag'),
            ...require('./tags/createTag')
        },
        '/tags': {
=======
        '/tag/{id}': {
            ...require('./tags/getTag'),
            ...require('./tags/createTag')
        },
        '/tag': {
>>>>>>> 2bb51a857ee9d432b68109de4e06aa2f73c44277
            ...require('./tags/getTags'),
            ...require('./tags/updateTag'),
            ...require('./tags/deleteTag')
        },
<<<<<<< HEAD
        '/categories/{id}': {
            ...require('./categories/getCategory'),
            ...require('./categories/createCategory')
        },
        '/categories': {
=======
        '/category/{id}': {
            ...require('./categories/getCategory'),
            ...require('./categories/createCategory')
        },
        '/category': {
>>>>>>> 2bb51a857ee9d432b68109de4e06aa2f73c44277
            ...require('./categories/getCategories'),
            ...require('./categories/updateCategory'),
            ...require('./categories/deleteCategory')
        },
<<<<<<< HEAD
        '/comments/{id}': {
            ...require('./comments/getComment'),
            ...require('./comments/createComment')
        },
        '/comments': {
=======
        '/comment/{id}': {
            ...require('./comments/getComment'),
            ...require('./comments/createComment')
        },
        '/comment': {
>>>>>>> 2bb51a857ee9d432b68109de4e06aa2f73c44277
            ...require('./comments/getComments'),
            ...require('./comments/updateComment'),
            ...require('./comments/deleteComment')
        },
<<<<<<< HEAD
        '/articles/{id}': {
            ...require('./articles/getArticle'),
            ...require('./articles/createArticle')
        },
        '/articles': {
=======
        '/article/{id}': {
            ...require('./articles/getArticle'),
            ...require('./articles/createArticle')
        },
        '/article': {
>>>>>>> 2bb51a857ee9d432b68109de4e06aa2f73c44277
            ...require('./articles/getArticles'),
            ...require('./articles/updateArticle'),
            ...require('./articles/deleteArticle')
        },
        '/article/details': {
            ...require('./articles/getArticlesDetails')
        },
<<<<<<< HEAD
        '/likes/{id}': {
            ...require('./likes/getLike'),
            ...require('./likes/createLike')
        },
        '/likes': {
=======
        '/like/{id}': {
            ...require('./likes/getLike'),
            ...require('./likes/createLike')
        },
        '/like': {
>>>>>>> 2bb51a857ee9d432b68109de4e06aa2f73c44277
            ...require('./likes/getLikes'),
            ...require('./likes/updateLike'),
            ...require('./likes/deleteLike')
        },
<<<<<<< HEAD
        '/followers/{id}': {
            ...require('./followers/getFollower'),
            ...require('./followers/createFollower')
        },
        '/followers': {
            ...require('./followers/getFollowers'),
            ...require('./followers/updateFollower'),
            ...require('./followers/deleteFollower')
        },
        '/followers/by-follower/{followerId}': {
            ...require('./followers/getFollowersByFollowerId')
        },
        '/followers/by-following/{followingId}': {
            ...require('./followers/getFollowersByFollowingId')
=======
        '/follower/{id}': {
            ...require('./followers/getFollower'),
            ...require('./followers/createFollower')
        },
        '/follower': {
            ...require('./followers/getFollowers'),
            ...require('./followers/updateFollower'),
            ...require('./followers/deleteFollower')
>>>>>>> 2bb51a857ee9d432b68109de4e06aa2f73c44277
        }
    }
}