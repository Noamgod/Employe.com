const Joi = require('joi');
const userSingUpSchema = Joi.object({
    email: Joi.string().email().required().max(30),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+-=]{3,30}$')).required(),
    role: Joi.string().required(),
    firstName: Joi.string().required().max(30).min(3),
    lastName: Joi.string().required().max(30).min(3),
    phone: Joi.string().required().max(11).min(10)
});
const userLogInSchema = Joi.object({
    email: Joi.string().required().max(30),
    password: Joi.string().required()
});

const userUpdateSchema = Joi.object({
    email: Joi.string().email().max(30),
    role: Joi.string(),
    firstName: Joi.string().max(30).min(3),
    lastName: Joi.string().max(30).min(3),
    phone: Joi.string().max(11).min(10),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+-=]{3,30}$')),
    jobTitle: Joi.string(),
    directManager: Joi.string(),
    description: Joi.string()
});

export {userSingUpSchema, userLogInSchema,userUpdateSchema};

