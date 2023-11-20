module.exports = {
    get: {
        tags: ['Like'],
        summary: "Get a like by ID",
        description: "Retrieve a like by its unique ID.",
        operationId: "getLikeById",
        ...require('../../security'),
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaLike/Id"
                },
                required: true,
                description: "ID of the like to retrieve"
            }
        ],
        responses: {
            '200': {
                description: "Like was obtained",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/schemaLike/Like"
                        }
                    }
                }
            },
            '404': {
                description: "Like not found",
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
                                    example: "Like not found"
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