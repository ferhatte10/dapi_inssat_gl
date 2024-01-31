const Joi = require('joi');

exports.validatePeriodCreation = (req, res, next) => {
  
  const schema = Joi.object({
    name: Joi.string().max(150).required(),
    description: Joi.string().max(250).required(),
    number: Joi.number().integer().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

exports.validatePeriodUpdate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(150),
    description: Joi.string().max(250),
    number: Joi.number().integer(),
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
