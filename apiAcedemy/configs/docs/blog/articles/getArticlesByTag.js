module.exports = {
    get: {
        tags: ['Article'],
        summary: "Get articles by tag",
        description: "Article GET endpoint to retrieve a list of articles by tag ID.",
        operationId: "getArticlesByTag",
        ...require('../../security'),
        parameters: [
            {
                name: "tagId",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaTag/TagId"
                },
                required: true,
                description: "The ID of the tag to retrieve articles for"
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
                description: "No articles found for the specified tag ID",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    example: 'No articles found for the specified tag ID',
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
