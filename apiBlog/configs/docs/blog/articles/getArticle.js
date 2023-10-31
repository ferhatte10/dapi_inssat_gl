module.exports = {
    get: {
        tags: ['Article'],
        summary: "Get a specific article with id",
        description: "article GET endpoint",
        operationId: "getArticle",
        security: [
            {
                AuthToken: []
            }
        ],
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaArticle/Id"
                },
                required: true,
                description: "A single article id"
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
                description: "No article found",
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
                                    example: "No article found"
                                },
                                "data": {
                                    type: 'object',
                                    example: {}
                                }
                            }
                        }
                    }
                }
            }
        },
    }
}