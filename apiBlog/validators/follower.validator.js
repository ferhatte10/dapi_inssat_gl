const Joi = require('joi');

exports.verifyFollower = (req, res, next) => {
  const schema = Joi.object({
    follower_id: Joi.number().integer().required().messages({
      'number.empty': 'follower_id is required',
      'number.integer': 'follower_id must be an integer',
    }),
    following_id: Joi.number().integer().required().messages({
      'number.empty': 'following_id is required',
      'number.integer': 'following_id must be an integer',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
