module.exports = {
    get: {
        tags: ['Users'],
        summary: "Get user by ID",
        description: "Endpoint to retrieve a user by their ID",
        operationId: "getUserById",
        ...require('../../security'),
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/Uuid"
                },
                required: true,
                description: "User ID"
            }
        ],
        responses: {
            '200': {
                description: "User found",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/User"
                        }
                    }
                }
            },
            '404': {
                description: "User not found",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    example: "User not found"
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
                                    example: "Internal server error"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};