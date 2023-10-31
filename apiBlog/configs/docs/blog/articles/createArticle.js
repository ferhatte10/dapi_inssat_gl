module.exports = {
    post: {
        tags: ['Article'],
        summary: "Create a new article",
        description: "Create a new article.",
        operationId: "createArticle",
        security: [
            {
                AuthToken: []
            }
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: "#/components/schemas/schemaArticle/ArticleCreate"
                    }
                }
            }
        },
        responses: {
            '201': {
                description: "Article created successfully",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/schemaArticle/Article"
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
        },
    }
}