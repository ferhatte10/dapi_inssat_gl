const Joi = require('joi');

exports.validateImpressionCreation = (req, res, next) => {
  const schema = Joi.object({
    content: Joi.string().max(250).allow(""),
    level_id: Joi.number().integer().required(),
    activity_id: Joi.number().integer().required(),
    period_id: Joi.number().integer().required(),
    student_id: Joi.string().guid({version: 'uuidv4'}).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

exports.validateImpressionUpdate = (req, res, next) => {
  const schema = Joi.object({
    content: Joi.string().max(250),
    level_id: Joi.number().integer(),
    activity_id: Joi.number().integer(),
    period_id: Joi.number().integer(),
    student_id: Joi.string().guid({version: 'uuidv4'}),
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
