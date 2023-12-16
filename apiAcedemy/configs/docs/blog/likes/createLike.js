module.exports = {
    post: {
        tags: ['Like'],
        summary: "Create a new like",
        description: "Create a new like.",
        operationId: "createLike",
        ...require('../../security'),
        requestBody: {
            description: "New like data",
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: "#/components/schemas/schemaLike/LikeCreate"
                    }
                }
            }
        },
        responses: {
            '201': {
                description: "Like created successfully",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/schemaLike/Like"
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