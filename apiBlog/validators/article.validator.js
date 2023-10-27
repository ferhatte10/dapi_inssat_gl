const Joi = require('joi');

exports.verifyArticle = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().max(100).messages({
      'string.empty': 'Title is required',
      'string.max': 'Title must not exceed 100 characters',
    }),
    content: Joi.string().required().messages({
      'string.empty': 'Content is required',
    }),
    thumbnail: Joi.string().required().max(120).messages({
      'string.empty': 'Thumbnail is required',
      'string.max': 'Thumbnail must not exceed 120 characters',
    }),
    principal_image: Joi.string().required().max(120).messages({
      'string.empty': 'Principal image is required',
      'string.max': 'Principal image must not exceed 120 characters',
    }),
    status: Joi.string().required().max(20).messages({
      'string.empty': 'Status is required',
      'string.max': 'Status must not exceed 20 characters',
    }),
    flag_count: Joi.number().integer().required().default(0).messages({
      'number.empty': 'Flag count is required',
      'number.integer': 'Flag count must be an integer',
    }),
    like_count: Joi.number().integer().required().default(0).messages({
      'number.empty': 'Like count is required',
      'number.integer': 'Like count must be an integer',
    }),
    is_pinned: Joi.boolean().required().default(false).messages({
      'boolean.empty': 'Is pinned is required',
    }),
    is_blacklisted: Joi.boolean().required().default(false).messages({
      'boolean.empty': 'Is blacklisted is required',
    }),
    comment_authorized: Joi.boolean().required().default(true).messages({
      'boolean.empty': 'Comment authorized is required',
    }),
    published_at: Joi.date().required().messages({
      'date.empty': 'Published date is required',
    }),
    author_id: Joi.number().integer().required().messages({
      'number.empty': 'Author ID is required',
      'number.integer': 'Author ID must be an integer',
    }),
    category_id: Joi.number().integer().required().messages({
      'number.empty': 'Category ID is required',
      'number.integer': 'Category ID must be an integer',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
