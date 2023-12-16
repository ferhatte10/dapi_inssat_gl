const Joi = require('joi');

exports.validateStudentMaTutorCreation = (req, res, next) => {
  const schema = Joi.object({
    student_id: Joi.string().required(),
    tutor_id: Joi.string().required(),
    ma_id: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

exports.validateStudentMaTutorUpdate = (req, res, next) => {
  const schema = Joi.object({
    student_id: Joi.string(),
    tutor_id: Joi.string(),
    ma_id: Joi.string(),
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
