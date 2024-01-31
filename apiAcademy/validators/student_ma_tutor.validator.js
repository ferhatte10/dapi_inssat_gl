const Joi = require('joi');

exports.validateStudentMaTutorCreation = (req, res, next) => {
  const schema = Joi.object({
    student_id: Joi.string().uuid().required(),
    tutor_id: Joi.string().uuid().required(),
    ma_id: Joi.string().uuid().required(),
  }).custom((value, helpers) => {
    // Check if all IDs are different
    if (value.student_id === value.tutor_id || value.student_id === value.ma_id || value.tutor_id === value.ma_id) {
      return helpers.error('any.invalid', { message: 'All IDs must be different' });
    }
    return value;
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

exports.validateStudentMaTutorUpdate = (req, res, next) => {
  const schema = Joi.object({
    student_id: Joi.string().uuid(),
    tutor_id: Joi.string().uuid(),
    ma_id: Joi.string().uuid(),
  }).min(1).custom((value, helpers) => {
    // Check if all IDs are different
    if (value.student_id && (value.student_id === value.tutor_id || value.student_id === value.ma_id)) {
      return helpers.error('any.invalid', { message: 'All IDs must be different' });
    }
    if (value.tutor_id && value.tutor_id === value.ma_id) {
      return helpers.error('any.invalid', { message: 'All IDs must be different' });
    }
    return value;
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
