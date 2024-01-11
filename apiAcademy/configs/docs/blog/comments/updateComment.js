module.exports = {
    put: {
        tags: ['Comment'],
        summary: "Update a comment by ID",
        description: "Update an existing comment by its ID.",
        operationId: "updateComment",
        ...require('../../security'),
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaComment/Id"
                },
                required: true,
                description: "The ID of the comment to update"
            }
        ],
        requestBody: {
            description: "Updated comment object",
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: "#/components/schemas/schemaComment/Comment"
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "Comment updated successfully",
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
                                "error": {
                                    type: 'string',
                                    example: "Comment not found"
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
                                "error": {
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