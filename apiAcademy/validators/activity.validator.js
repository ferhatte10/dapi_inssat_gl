
const Joi = require('joi');

exports.validateActivityCreation = (req, res, next) => {
  req.body.is_delete = req.body.is_delete || false;
  req.body.is_free = req.body.is_free || false;
  
  const schema = Joi.object({ 
    name: Joi.string().required().max(250),
    position: Joi.number().integer().required(),
    is_delete: Joi.boolean().default(false),
    is_free: Joi.boolean().default(false),
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
    name: Joi.string().max(250),
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
