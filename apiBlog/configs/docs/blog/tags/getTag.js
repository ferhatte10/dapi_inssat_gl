module.exports = {
    get: {
        tags: ['Tag'],
        summary: "Get a specific tag by ID",
        description: "Retrieve a specific tag by its unique ID.",
        operationId: "getTagById",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaTag/Id"
                },
                required: true,
                description: "ID of the tag to retrieve"
            }
        ],
        responses: {
            '200': {
                description: "Tag obtained successfully",
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