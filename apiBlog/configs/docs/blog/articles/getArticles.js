module.exports = {
    get: {
        tags: ['Article'],
        summary: "Get all articles",
        description: "articles GET endpoint",
        operationId: "getArticles",
        security: [
            {
                AuthToken: []
            }
        ],
        responses: {
            '200': {
                description: "Articles were obtained",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/Article"
                        }
                    }
                }
            },
            '404': {
                description: "No articles found",
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
                                    example: "No articles found"
                                },
                                "data": {
                                    type: 'array',
                                    example: []
                                }
                            }
                        }

                    }
                }
            }
        },
    }
}