const Joi = require('joi');

exports.verifyArticleTag = (req, res, next) => {
  const schema = Joi.object({
    tag_id: Joi.number().integer().required().messages({
      'number.empty': 'Tag ID is required',
      'number.integer': 'Tag ID must be an integer',
    }),
    article_id: Joi.number().integer().required().messages({
      'number.empty': 'Article ID is required',
      'number.integer': 'Article ID must be an integer',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
