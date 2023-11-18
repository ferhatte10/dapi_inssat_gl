module.exports = {
    get: {
        tags: ['Like'],
        summary: "Get all likes",
        description: "Retrieve a list of all likes.",
        operationId: "getAllLikes",
        security: [
            {
                AuthToken: []
            }
        ],
        responses: {
            '200': {
                description: "Likes were obtained",
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