module.exports = {
    get:{
        tags:['Blog'],
        summary:"Get a specific blog with uuid",
        description: "blog GET endpoint",
        operationId: "getBlog",
        security:[
            {
                AuthToken:[]
            }
        ],
        parameters:[
            {
                name:"uuid",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/Uuid"
                },
                required:true,
                description: "A single blog uuid"
            }
        ],
        responses:{
            '200':{
                description:"Blog was obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Blog"
                        }
                    }
                }
            },
            '404':{
                description:"No blog found",
                content:{
                    'application/json':{
                        schema:{
                            
                            type:'object',
                            properties:{
                                "success":{
                                    type:'boolean',
                                    example:false
                                },
                                "message":{
                                    type:'string',
                                    example:"No blog found"
                                },
                                "data":{
                                    type:'array',
                                    example:[]
                                }
                            }
                        }
                        
                    }
                }
            }
        },
    }
}