module.exports = {
    get: {
        tags: ['Article'],
        summary: "Retrieve a list of articles with extended details",
        description: "Retrieve a list of articles with extended details, including tags.",
        operationId: "getArticlesWithDetails",
        ...require('../../security'),
        parameters: [
            {
                name: "page",
                in: "query",
                schema: {
                    type: "integer"
                },
                description: "Current page (default to 1)",
                required: false
            },
            {
                name: "perPage",
                in: "query",
                schema: {
                    type: "integer"
                },
                description: "Articles per page (default to 10)",
                required: false
            }
        ],
        responses: {
            '200': {
                description: "Articles with extended details obtained successfully",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                articles: {
                                    type: 'array',
                                    items: {
                                        $ref: "#/components/schemas/schemaArticle/Article"
                                    }
                                },
                                pagination: {
                                    type: 'object',
                                    properties: {
                                        page: {
                                            type: 'integer',
                                            example: 1
                                        },
                                        perPage: {
                                            type: 'integer',
                                            example: 10
                                        },
                                        totalArticles: {
                                            type: 'integer',
                                            example: 20
                                        },
                                        totalPages: {
                                            type: 'integer',
                                            example: 2
                                        }
                                    }
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
        }
    }
}