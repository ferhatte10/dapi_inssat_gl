module.exports = {
    delete: {
        tags: ['Comment'],
        summary: "Delete a specific comment by ID",
        description: "Delete a single comment by its ID.",
        operationId: "deleteCommentById",
        ...require('../../security'),
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaComment/Id"
                },
                required: true,
                description: "The ID of the comment to delete"
            }
        ],
        responses: {
            '200': {
                description: "Comment deleted successfully",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                "message": {
                                    type: 'string',
                                    example: "Comment deleted"
                                }
                            }
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