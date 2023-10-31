module.exports = {
    schemaCategory: {
        Id: {
            type: 'integer',
            description: 'The id of the category',
            example: 1
        },
        Category: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    description: 'The id of the category',
                    example: 1
                },
                title: {
                    type: 'string',
                    description: 'The title of the category',
                    example: 'Technology'
                },
                parent_id: {
                    type: 'integer',
                    description: 'The id of the parent category (if applicable)',
                    example: 2
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
        CategoryCreate: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    description: 'The title of the category',
                    example: 'Technology'
                },
                parent_id: {
                    type: 'integer',
                    description: 'The id of the parent category (if applicable)',
                    example: 2
                }
            }
        }
    }
}