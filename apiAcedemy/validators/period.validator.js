const Joi = require('joi');

exports.validatePeriodCreation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(20).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

exports.validatePeriodUpdate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(20),
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
