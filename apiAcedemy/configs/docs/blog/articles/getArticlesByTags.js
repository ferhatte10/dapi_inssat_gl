// Module de documentation pour Get articles by multiple tags
module.exports = {
    get: {
        tags: ['Article'],
        summary: "Get articles by multiple tags",
        description: "Article GET endpoint to retrieve a list of articles by multiple tag IDs.",
        operationId: "getArticlesByTags",
        ...require('../../security'),
        parameters: [
            {
                name: "tagsId",
                in: "query",
                schema: {
                    type: 'array',
                    items: {
                        $ref: "#/components/schemas/schemaTag/TagsId"
                    }
                },
                required: true,
                description: "An array of tag IDs to retrieve articles for"
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
                description: "No articles found for the specified tag IDs",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    example: 'No articles found for the specified tag IDs',
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
