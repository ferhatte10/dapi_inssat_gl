const Joi = require('joi');

const validateUserClassCreation = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.string().uuid().required(),
    class_id: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};

const validateUserClassUpdate = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.string().uuid(),
    class_id: Joi.string(),
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};

module.exports = {
  validateUserClassCreation,
  validateUserClassUpdate
};
