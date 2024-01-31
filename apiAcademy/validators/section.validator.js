const Joi = require('joi');

exports.validateSectionCreation = (req, res, next) => {
  req.body.description = req.body.description || ' '
  const schema = Joi.object({
    title: Joi.string().max(150).required(),
    description: Joi.string().max(400).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

exports.validateSectionUpdate = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().max(150),
    description: Joi.string().max(400),
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
