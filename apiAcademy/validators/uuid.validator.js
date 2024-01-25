const Joi = require('joi');

exports.uuidValidator = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().guid({ version: 'uuidv4' }).required()
    });
    const { error } = schema.validate(req.params);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};
