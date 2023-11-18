module.exports = {
    schemaComment: {
        Id: {
            type: 'integer',
            description: 'The id of the comment',
            example: 1
        },
        Comment: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    description: 'The id of the comment',
                    example: 1
                },
                title: {
                    type: 'string',
                    description: 'The title of the comment',
                    example: 'My Comment'
                },
                content: {
                    type: 'string',
                    description: 'The content of the comment',
                    example: 'This is a comment.'
                },
                is_published: {
                    type: 'boolean',
                    description: 'Indicates if the comment is published',
                    example: true
                },
                parent_id: {
                    type: 'integer',
                    description: 'The id of the parent comment (if applicable)',
                    example: 2
                },
                article_id: {
                    type: 'integer',
                    description: 'The id of the article to which the comment belongs',
                    example: 3
                },
                user_id: {
                    type: 'integer',
                    description: 'The id of the user who posted the comment',
                    example: 4
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
        CommentCreate: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    description: 'The title of the comment',
                    example: 'My Comment'
                },
                content: {
                    type: 'string',
                    description: 'The content of the comment',
                    example: 'This is a comment.'
                },
                is_published: {
                    type: 'boolean',
                    description: 'Indicates if the comment is published',
                    example: true
                },
                parent_id: {
                    type: 'integer',
                    description: 'The id of the parent comment (if applicable)',
                    example: 2
                },
                article_id: {
                    type: 'integer',
                    description: 'The id of the article to which the comment belongs',
                    example: 3
                },
                user_id: {
                    type: 'integer',
                    description: 'The id of the user who posted the comment',
                    example: 4
                }
            }
        }
    }
}