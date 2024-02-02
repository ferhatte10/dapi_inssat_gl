const Joi = require('joi');

exports.validateGradeCreation = (req, res, next) => {
  const schema = Joi.object({
    student_id: Joi.string().guid({version: 'uuidv4'}).required(),
    grade: Joi.number().required(),
    assessment_id: Joi.number().integer().required(),
    period_id: Joi.number().integer().required(),
    comment: Joi.string().max(255).required().allow(""),
    section_id: Joi.number().integer().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

exports.validateGradeUpdate = (req, res, next) => {
  const schema = Joi.object({
    student_id: Joi.string().guid({version: 'uuidv4'}),
    grade: Joi.number(),
    assessment_id: Joi.number().integer(),
    period_id: Joi.number().integer(),
    comment: Joi.string().max(255),
    section_id: Joi.number().integer(),
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
