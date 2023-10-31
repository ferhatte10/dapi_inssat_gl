module.exports = {
    getAll: {
        tags: ['Follower'],
        summary: "Get all followers",
        description: "Follower GET endpoint to retrieve all followers.",
        operationId: "getAllFollowers",
        security: [
            {
                AuthToken: []
            }
        ],
        responses: {
            '200': {
                description: "List of followers",
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
            '500': {
                description: "Internal server error",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    example: "Internal server error"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}