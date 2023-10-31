module.exports = {
    post: {
        tags: ['Follower'],
        summary: "Create a new follower",
        description: "Follower POST endpoint to create a new follower.",
        operationId: "createFollower",
        security: [
            {
                AuthToken: []
            }
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: "#/components/schemas/schemaFollower/FollowerCreate"
                    }
                }
            },
            required: true,
            description: "New follower data to create"
        },
        responses: {
            '201': {
                description: "Follower created successfully",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/schemaFollower/Follower"
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