module.exports = {
    put: {
        tags: ['Like'],
        summary: "Update a like by ID",
        description: "Update a like by its unique ID.",
        operationId: "updateLikeById",
        ...require('../../security'),
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaLike/Id"
                },
                required: true,
                description: "ID of the like to update"
            }
        ],
        requestBody: {
            description: "Updated like data",
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: "#/components/schemas/schemaLike/Like"
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "Like updated successfully",
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