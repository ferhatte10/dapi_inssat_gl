module.exports = {
    delete: {
        tags: ['Article'],
        summary: "Delete an article by ID",
        description: "Delete an article by its unique ID.",
        operationId: "deleteArticle",
        ...require('../../security'),
        "consumes": [
            "application/x-www-form-urlencoded"
        ],
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaArticle/Id"
                },
                required: true,
                description: "ID of the article to delete"
            }
        ],
        responses: {
            '200': {
                description: "Article deleted successfully",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                    example: "Article deleted"
                                }
                            }
                        }
                    }
                }
            },
            '404': {
                description: "Article not found",
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
                                    example: "Article not found"
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
        },
    }
}