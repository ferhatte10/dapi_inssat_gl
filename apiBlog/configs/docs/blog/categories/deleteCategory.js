module.exports = {
    delete: {
        tags: ['Category'],
        summary: "Delete a category by ID",
        description: "Delete a category by its unique ID.",
        operationId: "deleteCategoryById",
        ...require('../../security'),
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaCategory/Id"
                },
                required: true,
                description: "ID of the category to delete"
            }
        ],
        responses: {
            '200': {
                description: "Category deleted successfully",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                    example: "Category deleted"
                                }
                            }
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