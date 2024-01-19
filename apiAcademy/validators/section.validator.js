const Joi = require('joi');

exports.validateSectionCreation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().max(30).required(),
    description: Joi.string().max(120).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

exports.validateSectionUpdate = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().max(30),
    description: Joi.string().max(120),
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
