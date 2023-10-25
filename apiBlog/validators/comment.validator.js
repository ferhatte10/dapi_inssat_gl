const Joi = require('joi');

exports.verifyComment = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().max(20).messages({
      'string.empty': 'title is required',
      'string.max': 'title must not exceed 20 characters',
    }),
    content: Joi.string().required().messages({
      'string.empty': 'content is required',
    }),
    is_published: Joi.boolean().required().messages({
      'boolean.empty': 'is_published is required',
    }),
    parent_id: Joi.number().integer().allow(null).messages({
      'number.integer': 'parent_id must be an integer',
    }),
    article_id: Joi.number().integer().required().messages({
      'number.empty': 'article_id is required',
      'number.integer': 'article_id must be an integer',
    }),
    user_id: Joi.number().integer().required().messages({
      'number.empty': 'user_id is required',
      'number.integer': 'user_id must be an integer',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
