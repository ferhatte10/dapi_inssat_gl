module.exports = {
    delete: {
        tags: ['Tag'],
        summary: "Delete a tag by ID",
        description: "Delete a tag by its unique ID.",
        operationId: "deleteTagById",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaTag/Id"
                },
                required: true,
                description: "ID of the tag to delete"
            }
        ],
        responses: {
            '200': {
                description: "Tag deleted successfully",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                    example: "Tag deleted"
                                }
                            }
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