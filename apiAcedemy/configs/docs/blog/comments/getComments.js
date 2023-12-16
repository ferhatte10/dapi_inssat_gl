module.exports = {
    get: {
        tags: ['Comment'],
        summary: "Get all comments",
        description: "Retrieve a list of all comments.",
        operationId: "getAllComments",
        ...require('../../security'),
        responses: {
            '200': {
                description: "Comments retrieved successfully",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/schemaComment/Comment"
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