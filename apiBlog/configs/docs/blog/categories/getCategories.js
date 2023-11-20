module.exports = {
    get: {
        tags: ['Category'],
        summary: "Get all categories",
        description: "Get all categories.",
        operationId: "getAllCategories",
        ...require('../../security'),
        responses: {
            '200': {
                description: "Categories were obtained",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/schemaCategory/Category"
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