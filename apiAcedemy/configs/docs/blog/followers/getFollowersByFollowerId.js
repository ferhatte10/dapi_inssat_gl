module.exports = {
    get: {
        tags: ['Follower'],
        summary: "Get followers by Follower ID",
        description: "Follower GET endpoint to retrieve a list of followers by Follower ID.",
        operationId: "getFollowersByFollowerId",
        ...require('../../security'),
        parameters: [
            {
                name: "followerId",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaFollower/FollowingId"
                },
                required: true,
                description: "The ID of the Follower to retrieve followers for"
            }
        ],
        responses: {
            '200': {
                description: "Followers obtained successfully",
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: "#/components/schemas/schemaFollower/Follower"
                            }
                        }
                    }
                }
            },
            '404': {
                description: "No followers found for the specified Follower ID",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    example: 'No followers found for the specified Follower ID'
                                }
                            }
                        }
                    }
                }
            },
            '500': {
                description: "Internal server error",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    example: 'Internal server error'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}