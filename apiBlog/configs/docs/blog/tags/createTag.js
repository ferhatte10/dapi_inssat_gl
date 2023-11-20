module.exports = {
    post: {
        tags: ['Tag'],
        summary: "Create a new tag",
        description: "Create a new tag.",
        operationId: "createTag",
        ...require('../../security'),
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: "#/components/schemas/schemaTag/TagCreate"
                    }
                }
            },
            required: true
        },
        responses: {
            '201': {
                description: "Tag created successfully",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/schemaTag/Tag"
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