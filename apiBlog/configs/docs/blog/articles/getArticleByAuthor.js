// Module de documentation pour Get articles by author
module.exports = {
    get: {
        tags: ['Article'],
        summary: "Get articles by author",
        description: "Article GET endpoint to retrieve a list of articles by author ID.",
        operationId: "getArticlesByAuthor",
        security: [
            {
                AuthToken: []
            }
        ],
        parameters: [
            {
                name: "authorId",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaAuthor/AuthorId"
                },
                required: true,
                description: "The ID of the author to retrieve articles for"
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
                description: "No articles found for the specified author ID",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    example: 'No articles found for the specified author ID',
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
