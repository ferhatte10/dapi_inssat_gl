// Module de documentation pour Get article with extended details
module.exports = {
    get: {
        tags: ['Article'],
        summary: "Get article with extended details",
        description: "Article GET endpoint to retrieve detailed information about a specific article, including tags and author details.",
        operationId: "getArticleWithDetails",
        security: [
            {
                AuthToken: []
            }
        ],
        parameters: [
            {
                name: "articleId",
                in: "path",
                schema: {
                    type: 'integer',
                },
                required: true,
                description: "The ID of the article to retrieve details for"
            }
        ],
        responses: {
            '200': {
                description: "Article details obtained successfully",
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
                                error: {
                                    type: 'string',
                                    example: 'Article not found',
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
    },
};
