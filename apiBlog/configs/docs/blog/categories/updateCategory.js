module.exports = {
    put: {
        tags: ['Category'],
        summary: "Update a category by ID",
        description: "Update a category by its unique ID.",
        operationId: "updateCategoryById",
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
                    $ref: "#/components/schemas/schemaCategory/Id"
                },
                required: true,
                description: "ID of the category to update"
            }
        ],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: "#/components/schemas/schemaCategory/Category"
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "Category updated successfully",
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