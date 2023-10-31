module.exports = {
    get: {
        tags: ['Follower'],
        summary: "Get a specific follower by ID",
        description: "Follower GET endpoint to retrieve a follower by their ID.",
        operationId: "getFollowerById",
        security: [
            {
                AuthToken: []
            }
        ],
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaFollower/Id"
                },
                required: true,
                description: "A single follower's ID"
            }
        ],
        responses: {
            '200': {
                description: "Follower was obtained",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/schemaFollower/Follower"
                        }
                    }
                }
            },
            '404': {
                description: "Follower not found",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    example: 'Follower not found'
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