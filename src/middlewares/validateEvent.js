const Joi = require('joi');

const eventSchemaForUpdate = Joi.object({
    id: Joi.number(),
    title: Joi.string(),
    date: Joi.date(),
    location: Joi.string()
});

const eventSchemaForCreate = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    date: Joi.date().required(),
    location: Joi.string().required()
});

const validateEvent = (isUpdate = false) => {
    return (res, req, next) => {
        const schema = isUpdate ? eventSchemaForUpdate : eventSchemaForCreate
        const {error} = schema.validate(req.body);
        if (error) {
            const errorMessages = error.details.map((error) => error.message);
            return res.status(400).json({errors: errorMessages});
        }
        next();
    }
}

module.exports = validateEvent;