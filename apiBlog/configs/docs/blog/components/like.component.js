module.exports = {
    schemaLike: {
        Id: {
            type: 'integer',
            description: 'The unique identifier of the like',
            example: 1
        },
        Like: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    description: 'The unique identifier of the like',
                    example: 1
                },
                article_id: {
                    type: 'integer',
                    description: 'The identifier of the liked article',
                    example: 1
                },
                user_id: {
                    type: 'integer',
                    description: 'The identifier of the user who performed the like',
                    example: 1
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
        LikeCreate: {
            type: 'object',
            properties: {
                article_id: {
                    type: 'integer',
                    description: 'The identifier of the liked article',
                    example: 1
                },
                user_id: {
                    type: 'integer',
                    description: 'The identifier of the user who performed the like',
                    example: 1
                }
            }
        }
    }
}