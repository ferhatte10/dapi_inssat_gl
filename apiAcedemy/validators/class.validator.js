const Joi = require('joi');

exports.validateClassCreation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(20).required(),
    apprenticeship: Joi.boolean().required(),
   });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

exports.validateClassUpdate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(20),
    apprenticeship: Joi.boolean(),
   }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
