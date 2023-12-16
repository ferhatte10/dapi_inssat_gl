const Joi = require('joi');

exports.validateCompanyCreation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(30).required(),
    address: Joi.string().max(50).required(),
    city: Joi.string().max(30).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

exports.validateCompanyUpdate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(30),
    address: Joi.string().max(50),
    city: Joi.string().max(30),
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
