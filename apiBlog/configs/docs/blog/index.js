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
        '/tags/{id}': {
            ...require('./tags/getTag'),
            ...require('./tags/createTag')
        },
        '/tags': {
            ...require('./tags/getTags'),
            ...require('./tags/updateTag'),
            ...require('./tags/deleteTag')
        },
        '/categories/{id}': {
            ...require('./categories/getCategory'),
            ...require('./categories/createCategory')
        },
        '/categories': {
            ...require('./categories/getCategories'),
            ...require('./categories/updateCategory'),
            ...require('./categories/deleteCategory')
        },
        '/comments/{id}': {
            ...require('./comments/getComment'),
            ...require('./comments/createComment')
        },
        '/comments': {
            ...require('./comments/getComments'),
            ...require('./comments/updateComment'),
            ...require('./comments/deleteComment')
        },
        '/articles/{id}': {
            ...require('./articles/getArticle'),
            ...require('./articles/createArticle')
        },
        '/articles': {
            ...require('./articles/getArticles'),
            ...require('./articles/updateArticle'),
            ...require('./articles/deleteArticle')
        },
        '/article/details': {
            ...require('./articles/getArticlesDetails')
        },
        '/article/category/{categoryId}': {
            ...require('./articles/getArticlesByCategory')
        },
        '/article/tag/{tagId}': {
            ...require('./articles/getArticlesByTag')
        },
        '/article/tags/{tagsId}': {
            ...require('./articles/getArticlesByTags')
        },
        '/article/author/{authorId}': {
            ...require('./articles/getArticlesByAuthor')
        },
        '/article/time/{time}': {
            ...require('./articles/getArticlesByTimePeriod')
        },
        '/likes/{id}': {
            ...require('./likes/getLike'),
            ...require('./likes/createLike')
        },
        '/likes': {
            ...require('./likes/getLikes'),
            ...require('./likes/updateLike'),
            ...require('./likes/deleteLike')
        },
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
        }
    }
}