module.exports = {
    update: {
        tags: ['Follower'],
        summary: "Update follower by ID",
        description: "Follower PUT endpoint to update an existing follower by ID.",
        operationId: "updateFollower",
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
                    type: "integer"
                },
                required: true,
                description: "The ID of the follower to update"
            }
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: "#/components/schemas/schemaFollower/Follower"
                    }
                }
            },
            required: true,
            description: "Updated follower data"
        },
        responses: {
            '200': {
                description: "Follower updated successfully",
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