module.exports = {
    put: {
        tags: ['Article'],
        summary: "Update an article by ID",
        description: "Update an article by its unique ID.",
        operationId: "updateArticle",
        ...require('../../security'),
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaArticle/Id"
                },
                required: true,
                description: "ID of the article to update"
            }
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: "#/components/schemas/schemaArticle/Article"
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "Article updated successfully",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/schemaArticle/Article"
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