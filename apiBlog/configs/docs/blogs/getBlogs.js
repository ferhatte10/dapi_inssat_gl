module.exports = {
    get:{
        tags:['Blog'],
        summary:"Get all blogs",
        description: "blogs GET endpoint",
        operationId: "getBlogs",
        ...require('../security'),
        responses:{
            '200':{
                description:"Blogs were obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Blog"
                        }
                    }
                }
            },
            '404':{
                description:"No blogs found",
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
                                    example:"No blogs found"
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
