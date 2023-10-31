module.exports = {
    deleteByPk: {
        tags: ['Follower'],
        summary: "Delete a specific follower by ID",
        description: "Follower DELETE endpoint to delete a follower by their ID.",
        operationId: "deleteFollowerById",
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
                description: "A single follower's ID to delete"
            }
        ],
        responses: {
            '200': {
                description: "Follower deleted successfully",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                    example: 'Follower deleted'
                                }
                            }
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