module.exports = {
    get: {
        tags: ['Comment'],
        summary: "Get a specific comment by ID",
        description: "Retrieve a single comment by its ID.",
        operationId: "getCommentById",
        ...require('../../security'),
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaComment/Id"
                },
                required: true,
                description: "The ID of the comment to retrieve"
            }
        ],
        responses: {
            '200': {
                description: "Comment retrieved successfully",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/schemaComment/Comment"
                        }
                    }
                }
            },
            '404': {
                description: "Comment not found",
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
                                    example: "Comment not found"
                                },
                                "data": {
                                    type: 'array',
                                    example: []
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}