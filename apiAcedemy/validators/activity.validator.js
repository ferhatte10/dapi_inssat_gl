
const Joi = require('joi');

exports.validateActivityCreation = (req, res, next) => {
  const schema = Joi.object({ 
    name: Joi.string().required(),
    position: Joi.number().integer().required(),
    is_delete: Joi.boolean().required(),
    is_free: Joi.boolean().required(),
    section_id: Joi.number().integer().required(), 
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

exports.validateActivityUpdate = (req, res, next) => {
  const schema = Joi.object({  
    name: Joi.string(),
    position: Joi.number().integer(),
    is_delete: Joi.boolean(),
    is_free: Joi.boolean(),
    section_id: Joi.number().integer(), 
  }).min(1); 

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
