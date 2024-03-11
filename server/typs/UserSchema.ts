const Joi = require('joi');
const userSchema = Joi.object({
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
export {userSchema , userLogInSchema};