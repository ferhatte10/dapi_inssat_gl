const Joi = require('joi');

exports.verifyUser = (req, res, next) => {
  const schema = Joi.object({
    key_cloak_user_Id: Joi.string().max(50).required().messages({
      'string.empty': 'Keycloak user ID is required',
      'string.max': 'Keycloak user ID must not exceed 50 characters',
    }),
    name: Joi.string().max(20).required().messages({
      'string.empty': 'Name is required',
      'string.max': 'Name must not exceed 20 characters',
    }),
    last_name: Joi.string().max(20).required().messages({
      'string.empty': 'Last name is required',
      'string.max': 'Last name must not exceed 20 characters',
    }),
    profession: Joi.string().max(30).required().messages({
      'string.empty': 'Profession is required',
      'string.max': 'Profession must not exceed 30 characters',
    }),
    visible_email: Joi.boolean().required().default(true).messages({
      'boolean.empty': 'Visible email is required',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
