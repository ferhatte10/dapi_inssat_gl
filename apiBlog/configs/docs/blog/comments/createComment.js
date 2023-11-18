module.exports = {
    post: {
        tags: ['Comment'],
        summary: "Create a new comment",
        description: "Create a new comment.",
        operationId: "createComment",
        security: [
            {
                AuthToken: []
            }
        ],
        requestBody: {
            description: "Comment object to be created",
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: "#/components/schemas/schemaComment/CommentCreate"
                    }
                }
            }
        },
        responses: {
            '201': {
                description: "Comment created successfully",
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