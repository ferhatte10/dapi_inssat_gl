module.exports = {
    paths: {
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
        '/articles': {
            ...require('./articles/getArticles'),
            ...require('./articles/createArticle'),
        },
        '/articles/{id}': {
            ...require('./articles/getArticle'),
            ...require('./articles/updateArticle'),
            ...require('./articles/deleteArticle')
        },
        '/articles/details': {
            ...require('./articles/getArticlesDetails')
        },
        '/articles/details/{id}': {
            ...require('./articles/getArticleDetails')
        },
        '/articles/category/{categoryId}': {
            ...require('./articles/getArticlesByCategory')
        },
        '/articles/tag/{tagId}': {
            ...require('./articles/getArticlesByTag')
        },
        '/articles/tags/{tagsId}': {
            ...require('./articles/getArticlesByTags')
        },
        '/articles/author/{authorId}': {
            ...require('./articles/getArticlesByAuthor')
        },
        '/articles/time/{time}': {
            ...require('./articles/getArticlesByTimePeriod')
        },
        '/articles/category/name/{categoryName}': {
            ...require('./articles/getArticlesByCategoryName')
        },
        '/articles/author/name/{authorName}': {
            ...require('./articles/getArticlesByAuthorName')
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