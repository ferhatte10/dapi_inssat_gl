module.exports = {
    get: {
        tags: ['Tag'],
        summary: "Get all tags",
        description: "Retrieve a list of all tags.",
        operationId: "getAllTags",
        ...require('../../security'),
        responses: {
            '200': {
                description: "Tags obtained successfully",
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: "#/components/schemas/schemaTag/Tag"
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