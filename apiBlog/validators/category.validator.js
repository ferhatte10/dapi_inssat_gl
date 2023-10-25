const Joi = require('joi');

exports.verifyCategory = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().max(20).messages({
      'string.empty': 'title is required',
      'string.max': 'title must not exceed 20 characters',
    }),
    parent_id: Joi.number().integer().allow(null),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
