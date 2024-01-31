const Joi = require('joi');

const validateUserCompanyCreation = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.string().uuid().required(),
    company_id: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};

const validateUserCompanyUpdate = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.string().uuid(),
    company_id: Joi.string(),
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};

module.exports = {
    validateUserCompanyCreation,
    validateUserCompanyUpdate
};
