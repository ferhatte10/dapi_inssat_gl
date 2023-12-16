module.exports = {
    get: {
        tags: ['Category'],
        summary: "Get a category by ID",
        description: "Get a category by its unique ID.",
        operationId: "getCategoryById",
        ...require('../../security'),
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaCategory/Id"
                },
                required: true,
                description: "ID of the category to retrieve"
            }
        ],
        responses: {
            '200': {
                description: "Category obtained successfully",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/schemaCategory/Category"
                        }
                    }
                }
            },
            '404': {
                description: "Category not found",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                "success": {
                                    type: 'boolean',
                                    example: false
                                },
                                "message": {
                                    type: 'string',
                                    example: "Category not found"
                                },
                                "data": {
                                    type: 'object',
                                    example: {}
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
}