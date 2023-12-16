
const Joi = require('joi');

exports.validateAssessmentCreation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    coefficient: Joi.number().integer().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

exports.validateAssessmentUpdate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string(),
    coefficient: Joi.number().integer(),
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
