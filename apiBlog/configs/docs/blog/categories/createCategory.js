module.exports = {
    post: {
        tags: ['Category'],
        summary: "Create a new category",
        description: "Create a new category with the provided data.",
        operationId: "createCategory",
        security: [
            {
                AuthToken: []
            }
        ],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: "#/components/schemas/schemaCategory/CategoryCreate"
                    }
                }
            }
        },
        responses: {
            '201': {
                description: "Category created successfully",
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