module.exports = {
    get: {
        tags: ['Article'],
        summary: "Get articles by author name",
        description: "Article GET endpoint to retrieve a list of articles by author name.",
        operationId: "getArticlesByAuthorName",
        security: [
            {
                AuthToken: []
            }
        ],
        parameters: [
            {
                name: "authorName",
                in: "path",
                schema: {
                    type: 'string',
                },
                required: true,
                description: "The name of the author to retrieve articles for"
            }
        ],
        responses: {
            '200': {
                description: "Articles obtained successfully",
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: "#/components/schemas/schemaArticle/Article"
                            }
                        }
                    }
                }
            },
            '404': {
                description: "No articles found for the specified author name",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    example: 'No articles found for the specified author name',
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
