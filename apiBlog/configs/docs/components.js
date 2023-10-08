module.exports = {
    components:{
        securitySchemes: {
            AuthToken: {
                
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"

            },
        },
        schemas:{
            Uuid:{
                type:'string',
                description:'The uuid of the blog',
                example:'11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'
            },
            Blog:{
                type:'object',
                properties:{
                    id:{
                        type:'integer',
                        description:'The id of the blog',
                        example:1
                    },
                    uuid:{
                        type:'string',
                        description:'The uuid of the blog',
                        example:'11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'
                    },
                    title:{
                        type:'string',
                        description:'The title of the blog',
                        example:'My first blog'
                    },
                    content:{
                        type:'string',
                        description:'The content of the blog',
                        example:'This is my first blog'
                    },
                    author:{
                        type:'string',
                        description:'The author of the blog',
                        example:'John Doe'
                    },
                    createdAt:{
                        type:'string',
                        description:'The date the blog was created',
                        format:'date-time'
                    },
                    updatedAt:{
                        type:'string',
                        description:'The date the blog was updated',
                        format:'date-time'
                    }
                },
            },
            BlogCreate:{
                type:'object',
                properties:{
                    title:{
                        type:'string',
                        description:'The title of the blog',
                        example:'My first blog',
                        required:true
                    },
                    content:{
                        type:'string',
                        description:'The content of the blog',
                        example:'This is my first blog',
                        required:true
                    },
                    author:{
                        type:'string',
                        description:'The author of the blog',
                        example:'John Doe',
                        required:true
                    },
                    createdAt:{
                        type:'string',
                        description:'The date the blog was created',
                        format:'date-time',
                        example: new Date().toISOString(),
                        required:true
                    
                    }
                }
            }
        }
    }
}