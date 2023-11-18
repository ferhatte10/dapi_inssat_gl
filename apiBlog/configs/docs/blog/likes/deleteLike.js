module.exports = {
    delete: {
        tags: ['Like'],
        summary: "Delete a like by ID",
        description: "Delete a like by its unique ID.",
        operationId: "deleteLikeById",
        security: [
            {
                AuthToken: []
            }
        ],
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/schemaLike/Id"
                },
                required: true,
                description: "ID of the like to delete"
            }
        ],
        responses: {
            '200': {
                description: "Like deleted successfully",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                    example: "Like deleted"
                                }
                            }
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