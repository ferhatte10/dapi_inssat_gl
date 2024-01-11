module.exports = {
    schemaArticle: {
        Id: {
            type: 'integer',
            description: 'The id of the article',
            example: 1
        },
        CategoryId: {
            type: 'integer',
            description: 'The id of a specific Category',
            example: 1
        },
        TagId: {
            type: 'integer',
            description: 'The id of a specific Tag',
            example: 1
        },
        TagsId: {
            type: 'array',
            description: 'Multiple id of a specific Tag',
            example: [1, 2]
        },
        AuthorId: {
            type: 'integer',
            description: 'The id of a specific Author',
            example: 1
        },
        Article: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    description: 'The id of the article',
                    example: 1
                },
                title: {
                    type: 'string',
                    description: 'The title of the article',
                    example: 'My first article'
                },
                description: {
                    type: 'string',
                    description: 'The description of the article',
                    example: 'This is my first article'
                },
                content: {
                    type: 'string',
                    description: 'The content of the article',
                    example: 'This is my first article dans lequel nous allons expliquer le fonctionnement de comment créer un article'
                },
                thumbnail: {
                    type: 'string',
                    description: 'The thumbnail image of the article',
                    example: 'url/thumbnail'
                },
                principal_image: {
                    type: 'string',
                    description: 'The principal image of the article',
                    example: 'url/principal_image'
                },
                status: {
                    type: 'string',
                    description: 'The status of the article',
                    example: 'Published'
                },
                flag_count: {
                    type: 'integer',
                    description: 'The number of reports of the article',
                    example: 2
                },
                like_count: {
                    type: 'integer',
                    description: 'The number of likes of the article',
                    example: 10
                },
                is_pinned: {
                    type: 'boolean',
                    description: 'The article is pinned',
                    example: true
                },
                is_blacklisted: {
                    type: 'boolean',
                    description: 'The article is blacklisted',
                    example: false
                },
                comment_authorized: {
                    type: 'boolean',
                    description: 'Comments are authorized on the article',
                    example: true
                },
                published_at: {
                    type: 'string',
                    description: 'The date the article was published',
                    format: 'date-time',
                    example: '2023-10-31T08:00:00Z'
                },
                author: {
                    type: 'string',
                    description: 'The author of the article',
                    example: 'John Doe'
                },
                createdAt: {
                    type: 'string',
                    description: 'The date the blog was created',
                    format: 'date-time',
                    example: '2023-10-28T15:30:00Z' // Example date and time
                },
                updatedAt: {
                    type: 'string',
                    description: 'The date the blog was updated',
                    format: 'date-time',
                    example: '2023-10-29T10:45:00Z' // Example date and time
                }
            }
        },
        ArticleCreate: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    description: 'The title of the article',
                    example: 'My first article'
                },
                description: {
                    type: 'string',
                    description: 'The description of the article',
                    example: 'This is my first article'
                },
                content: {
                    type: 'string',
                    description: 'The content of the article',
                    example: 'This is my first article dans lequel nous allons expliquer le fonctionnement de comment créer un article'
                },
                thumbnail: {
                    type: 'string',
                    description: 'The thumbnail image of the article',
                    example: 'url/thumbnail'
                },
                principal_image: {
                    type: 'string',
                    description: 'The principal image of the article',
                    example: 'url/principal_image'
                },
                status: {
                    type: 'string',
                    description: 'The status of the article',
                    example: 'Published'
                },
                flag_count: {
                    type: 'integer',
                    description: 'The number of reports of the article',
                    example: 2
                },
                like_count: {
                    type: 'integer',
                    description: 'The number of likes of the article',
                    example: 10
                },
                is_pinned: {
                    type: 'boolean',
                    description: 'The article is pinned',
                    example: true
                },
                is_blacklisted: {
                    type: 'boolean',
                    description: 'The article is blacklisted',
                    example: false
                },
                comment_authorized: {
                    type: 'boolean',
                    description: 'Comments are authorized on the article',
                    example: true
                },
                published_at: {
                    type: 'string',
                    description: 'The date the article was published',
                    format: 'date-time',
                    example: '2023-10-31T08:00:00Z'
                },
                author: {
                    type: 'string',
                    description: 'The author of the article',
                    example: 'John Doe'
                },
                category_id: {
                    type: 'integer',
                    description: 'The category ID to which the article belongs',
                    example: 1
                },
            }
        }
    }
}