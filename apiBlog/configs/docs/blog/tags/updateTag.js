module.exports = {
    put: {
        tags: ['Tag'],
        summary: "Update a tag by ID",
        description: "Update a tag by its unique ID.",
        operationId: "updateTagById",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaTag/Id"
                },
                required: true,
                description: "ID of the tag to update"
            }
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: "#/components/schemas/schemaTag/Tag"
                    }
                }
            },
            required: true
        },
        responses: {
            '200': {
                description: "Tag updated successfully",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/schemaTag/Tag"
                        }
                    }
                }
            },
            '404': {
                description: "Tag not found",
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
                                    example: "Tag not found"
                                },
                                "data": {
                                    type: 'object',
                                    example: {}
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