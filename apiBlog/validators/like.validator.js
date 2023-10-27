const Joi = require('joi');

exports.verifyLike = (req, res, next) => {
  const schema = Joi.object({
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
