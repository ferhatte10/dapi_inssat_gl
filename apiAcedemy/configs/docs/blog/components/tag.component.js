module.exports = {

    schemaTag: {
        Id: {
            type: 'integer',
            description: 'The unique identifier of the tag',
            example: 1
        },
        Tag: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    description: 'The unique identifier of the tag',
                    example: 1
                },
                title: {
                    type: 'string',
                    description: 'The title of the tag',
                    example: 'Technology'
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
        TagCreate: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    description: 'The title of the tag',
                    example: 'Technology'
                }
            }
        }
    }
}