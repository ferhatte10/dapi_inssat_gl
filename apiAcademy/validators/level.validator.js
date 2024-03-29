const Joi = require('joi');

exports.validateLevelCreation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(30).required(),
    position: Joi.number().integer().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

exports.validateLevelUpdate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(30),
    position: Joi.number().integer(),
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
