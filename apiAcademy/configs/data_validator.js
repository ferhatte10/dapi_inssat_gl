const Joi = require('joi')

module.exports.blogCreate = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    content: Joi.string().min(1).max(255).required(),
    author: Joi.string().min(1).max(255).required(),
    createdAt: Joi.date().required()
})

module.exports.uuid = Joi.object({
    uuid: Joi.string().guid({version: 'uuidv4'}).required()
})
