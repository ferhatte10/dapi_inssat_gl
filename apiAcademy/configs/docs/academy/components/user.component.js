module.exports = {

    Uuid : {
        type: 'string',
        example: '2cabe1b3-e680-4cac-8d19-0fbeab351344',
        format: 'uuid'
    },
    Users : {
        type: 'array',
        items: {
            $ref: "#/components/schemas/User"
        }
    },
    User : {
        type: 'object',
        properties: {
            ID: {
                $ref: "#/components/schemas/Uuid"
            },
            USERNAME: {
                type: 'string',
                example: 'antoine_ine'
            },
            FIRST_NAME: {
                type: 'string',
                example: 'Antoine'
            },
            LAST_NAME: {
                type: 'string',
                example: 'TOI'
            },
            EMAIL: {
                type: 'string',
                example: 'antoine@example.com'
            },
            USER_ATTRIBUTES: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            example: 'key'
                        },
                        value: {
                            type: 'string',
                            example: 'value'
                        }
                    }
                }
            }
        }
    },
}