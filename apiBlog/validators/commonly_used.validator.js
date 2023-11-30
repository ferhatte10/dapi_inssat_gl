const Joi = require('joi');


exports.verifyRequestParamId = (req, res, next) => {
  // Validate the ID from URL params
  const { error: idError } = Joi.number().integer().validate(req.params.id);
  if (idError) {
    return res.status(400).json({ error: 'Invalid ID in URL params' });
  } 
  next();
};
exports.verifyRequestBodyIds = (req, res, next) => {
  // Validate the ID from URL params
  const { error: idError } = Joi.array().items(Joi.number()).validate(req.body.ids);
  if (idError) { 
    return res.status(400).json({ error: idError.message});
  }
  next();
};

exports.verifyRequestFile = (req, res, next) => {
  // I am checking if the file is not null/empty
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }
  next(); 
};




