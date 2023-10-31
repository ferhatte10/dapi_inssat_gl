module.exports = {
    post: {
        tags: ['Blog'],
        summary: "Create a new blog",
        description: "blog POST endpoint",
        operationId: "createBlog",
        parameters: [],
        security: [
            {
                AuthToken: []
            }
        ],
        requestBody: {
            content: {
                'application/x-www-form-urlencoded': {
                    schema: {
                        $ref: '#/components/schemas/schemaBlog/BlogCreate'
                    }
                },
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/schemaBlog/BlogCreate'
                    }
                },
            }
        },
        responses: {
            '201': {
                description: "Todo created successfully"
            },
            '400': {
                description: "Bad request"
            },
            '409': {
                description: "Blog already exists"
            },
            '500': {
                description: 'Server error'
            }
        }
    }
}