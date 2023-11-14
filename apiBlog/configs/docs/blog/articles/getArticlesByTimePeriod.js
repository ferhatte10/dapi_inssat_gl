module.exports = {
    get: {
        tags: ['Article'],
        summary: "Get articles by time period",
        description: "Article GET endpoint to retrieve a list of articles within a specified time period.",
        operationId: "getArticlesByTimePeriod",
        security: [
            {
                AuthToken: []
            }
        ],
        parameters: [
            {
                name: "dateStart",
                in: "query",
                schema: {
                    type: 'string',
                    format: 'date-time',
                    example: '2023-01-01T00:00:00Z',
                },
                required: true,
                description: "Start date of the time period"
            },
            {
                name: "dateEnd",
                in: "query",
                schema: {
                    type: 'string',
                    format: 'date-time',
                    example: '2023-12-31T23:59:59Z',
                },
                required: true,
                description: "End date of the time period"
            },
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
