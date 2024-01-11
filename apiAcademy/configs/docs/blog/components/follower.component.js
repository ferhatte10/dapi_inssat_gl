module.exports = {
    schemaFollower: {
        Id: {
            type: 'integer',
            description: 'The id of the follower relationship',
            example: 1
        },
        FollowerId: {
            type: 'integer',
            description: 'The id of the follower of the follower',
            example: 1
        },
        FollowingId: {
            type: 'integer',
            description: 'The id of the following of the follower',
            example: 1
        },
        Follower: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    description: 'The id of the follower relationship',
                    example: 1
                },
                follower_id: {
                    type: 'integer',
                    description: 'The id of the user who is the follower',
                    example: 2
                },
                following_id: {
                    type: 'integer',
                    description: 'The id of the user who is being followed',
                    example: 3
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
        FollowerCreate: {
            type: 'object',
            properties: {
                follower_id: {
                    type: 'integer',
                    description: 'The id of the user who is the follower',
                    example: 2
                },
                following_id: {
                    type: 'integer',
                    description: 'The id of the user who is being followed',
                    example: 3
                }
            }
        }
    }
}