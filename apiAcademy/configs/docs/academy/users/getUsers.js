module.exports = {
    get: {
        tags: ['Users'],
        summary: "Get all users",
        description: "Endpoint to retrieve all users",
        operationId: "getUsers",
        ...require('../../security'),
        responses: {
            '200': {
                description: "List of users",
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: "#/components/schemas/Users"
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