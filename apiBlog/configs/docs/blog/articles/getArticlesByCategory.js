module.exports = {
    get: {
        tags: ['Article'],
        summary: "Get a specific article with category id",
        description: "article GET by category endpoint",
        operationId: "getArticlesByCategory",
        security: [
            {
                AuthToken: []
            }
        ],
        parameters: [
            {
                name: "categoryId",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaArticle/CategoryId"
                },
                required: true,
                description: "A single category id"
            }
        ],
        responses: {
            '200': {
                description: "Article was obtained",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/schemaArticle/Article"
                        }
                    }
                }
            },
            '404': {
                description: "No articles found for the specified category ID",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    example: 'No articles found for the specified category ID',
                                },
                            },
                        },
                    },
                },
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
                                    example: 'Internal server error',
                                },
                            },
                        },
                    },
                }
            }
        },
    }
}