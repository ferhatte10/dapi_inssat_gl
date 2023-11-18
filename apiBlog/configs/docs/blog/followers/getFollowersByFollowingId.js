module.exports = {
    get: {
        tags: ['Follower'],
        summary: "Get followers by Following ID",
        description: "Follower GET endpoint to retrieve a list of followers by Following ID.",
        operationId: "getFollowersByFollowingId",
        security: [
            {
                AuthToken: []
            }
        ],
        parameters: [
            {
                name: "followingId",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaFollower/FollowerId"
                },
                required: true,
                description: "The ID of the Following user to retrieve followers for"
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
                description: "No followers found for the specified Following ID",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    example: 'No followers found for the specified Following ID'
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