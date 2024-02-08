
const userProperties = {
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
    // USER_ATTRIBUTES: {
    //     type: 'array',
    //     items: {
    //         type: 'object',
    //         properties: {
    //             name: {
    //                 type: 'string',
    //                 example: 'key'
    //             },
    //             value: {
    //                 type: 'string',
    //                 example: 'value'
    //             }
    //         }
    //     }
    // }
}

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
            ...userProperties
        }
    },
    Class :
    {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                example: 1
            },
            name: {
                type: 'string',
                example: 'IMR1'
            },
            apprenticeship: {
                type: 'boolean',
                example: true
            }
        }
    },
    Company: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                example: 1
            },
            name: {
                type: 'string',
                example: 'Orange'
            },
            address: {
                type: 'string',
                example: '123 Main Street'
            },
            city: {
                type: 'string',
                example: 'Lannion'
            },
            phone: {
                type: 'string',
                example: '+33 2 96 05 13 13'
            }
        }
    },
    UserSuivi : {
        type: 'object',
        properties: {
            ...userProperties,
            CLASS: {
                type: 'array',
                items: {
                    $ref: "#/components/schemas/Class"
                }
            },
            COMPANY: {
                type: 'array',
                items: {
                    $ref: "#/components/schemas/Company"
                }
            },
            MA: {
                type: 'array',
                items: {
                    $ref: "#/components/schemas/User"
                }
            },
            TUTOR: {
                type: 'array',
                items: {
                    $ref: "#/components/schemas/User"
                }
            }
        }

    }
}