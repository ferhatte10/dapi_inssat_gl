module.exports = {
    get: {
        tags: ['Users'],
        summary: "Get user details and related information",
        description: "Endpoint to retrieve user details along with their classes, companies, MAs, and tutors",
        operationId: "getUserSuivi",
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
                description: "User details with related information",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/UserSuivi"
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