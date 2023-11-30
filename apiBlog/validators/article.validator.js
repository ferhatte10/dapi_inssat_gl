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
   
    status: Joi.string().max(20).optional().messages({
      'string.max': 'Status must not exceed 20 characters',
    }),
    flag_count: Joi.number().integer().optional().default(0).messages({
      'number.integer': 'Flag count must be an integer',
    }),
    like_count: Joi.number().integer().optional().default(0),


    //the following part(thumbnail & principal_image) is managed by TheFileManager, it will check if the images are loaded and give them a unique name + store them on the server
    //please have a look at the "article" routes middlewares
    thumbnail: Joi.string().required().max(120).messages({
      'string.empty': 'Thumbnail is required',
      'string.max': 'Thumbnail must not exceed 120 characters',
    }),
    principal_image: Joi.string().required().max(120).messages({
      'string.empty': 'Principal image is required',
      'string.max': 'Principal image must not exceed 120 characters',
    }),

    is_pinned: Joi.boolean().truthy('true', '1').falsy('false', '0').optional().default(false),
    is_blacklisted: Joi.boolean().truthy('true', '1').falsy('false', '0').optional().default(false),
    comment_authorized: Joi.boolean().truthy('true', '1').falsy('false', '0').default(true),
    published_at: Joi.date().optional(),
    category_id: Joi.alternatives().try(Joi.number().integer(), Joi.string().required()).messages({
      'number.empty': 'Category ID is required',
      'number.integer': 'Category ID must be an integer',
    }),
    tags: Joi.string().optional().allow(''),
  });
   console.log(req.body)
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
