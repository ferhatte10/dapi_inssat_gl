
const Joi = require('joi');

exports.validateAssessmentCreation = (req, res, next) => {
  console.log(req.body)
  const schema = Joi.object({
    name: Joi.string().required().max(30),
    coefficient: Joi.number().integer().required(),
    position: Joi.number().integer().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

exports.validateAssessmentUpdate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(30),
    coefficient: Joi.number().integer(),
    position: Joi.number().integer().required(),
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
