module.exports = {
    delete: {
        tags: ['Article'],
        summary: "Delete articles by IDs",
        description: "Delete an articles by its unique ID.",
        operationId: "deleteArticles",
        ...require('../../security'),
        parameters: [
            {
                "name": "ids",
                "in": "query",
                "description": "IDs of the articles to delete",
                required: true,
                "schema": {
                    "type": "array",
                    "items": {
                        "type": "integer",
                        "minimum": 1
                    },
                    uniqueItems: true,

                }
            }
        ],
        responses: {
            '200': {
                description: "Articles deleted successfully",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                    example: "Articles deleted"
                                }
                            }
                        }
                    }
                }
            },
            '404': {
                description: "Articles not found",
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
                                    example: "Articles not found"
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