const Joi = require('joi');

exports.verifyArticle = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().max(100).messages({
      'string.empty': 'Title is required',
      'string.max': 'Title must not exceed 100 characters',
    }),
    description: Joi.string().required().max(180).messages({
      'string.empty': 'Description is required',
      'string.max': 'Description must not exceed 180 characters',
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
    status: Joi.string().valid('Published', 'Draft', 'Pending Review', 'Scheduled', 'Private', 'Password Protected', 'Archived', 'Trash', 'Sticky', 'Inactive')
      .optional().default('Published').messages({
        'any.only': 'Invalid status',
      }),
    comment_count: Joi.number().integer().optional().default(0).messages({
      'number.integer': 'Comment count must be an integer',
    }),
    flag_count: Joi.number().integer().optional().default(0).messages({
      'number.integer': 'Flag count must be an integer',
    }),
    like_count: Joi.number().integer().optional().default(0),

    is_pinned: Joi.boolean().truthy('true', '1').falsy('false', '0').optional().default(false),
    is_blacklisted: Joi.boolean().truthy('true', '1').falsy('false', '0').optional().default(false),
    comment_authorized: Joi.boolean().truthy('true', '1').falsy('false', '0').default(true),
    published_at: Joi.date().optional(),
    category_id: Joi.alternatives().try(Joi.number().integer(), Joi.string().required()).messages({
      'number.empty': 'Category ID is required',
      'number.integer': 'Category ID must be an integer',
    }),
    author_id: Joi.alternatives().try(Joi.number().integer(), Joi.string().required()).messages({
      'number.empty': 'Author ID is required'
    }),
    tags: Joi.string().optional().allow(''),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error });
  }

  next();
};

exports.validateGetFilteredArticles = (req, res, next) => {
  const schema = Joi.object({
    category: Joi.string().allow('').optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    dateRange: Joi.array().items(
      Joi.object({
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        key: Joi.string().required(),
      })
    ).optional(),
    search: Joi.string().allow('').optional(),
    page: Joi.number().integer().min(1).optional(),
    pageSize: Joi.number().integer().min(1).optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details.map((error) => error.message) });
  }

  next();
};