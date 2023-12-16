const Joi = require('joi');


exports.verifyRequestParamId = (req, res, next) => {  
  console.log(req)
  // Validate the ID from URL params
  const { error: idError } = Joi.number().integer().validate(req.params.id);
  if (idError) {
    return res.status(400).json({ error: 'Invalid ID in URL params' });
  } 
  next();
};
exports.verifyRequestBodyIds = (req, res, next) => {
  // Validate the ID from URL params
  let ids = {ids : req.query.ids}
  // if ids.ids is not an array and it an integer, we convert it to an array
    if(!Array.isArray(ids.ids) && typeof parseInt(ids.ids,10) === "number"){
        ids.ids = Array.of(parseInt(ids.ids,10))
    }else if(Array.isArray(ids.ids)){
        ids.ids = ids.ids.map(id => parseInt(id,10))
    }
  req.query.ids = ids.ids
  let schema = Joi.object({
    ids : Joi.array().items(Joi.number()).required()
  })
  const { error } = schema.validate(ids);
  if (error) {
    return res.status(400).json({ error: error.message});
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




