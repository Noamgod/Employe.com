import Joi, { ValidationResult } from 'joi';
import { ErrorResponse } from "../types/Error";


export const validateData = (data: any, schema: Joi.ObjectSchema): ErrorResponse | undefined => {
    const validation: ValidationResult = schema.validate(data);
    if (validation.error) {
        return {
            message: validation.error.message,
            status: 400
        };
    }
};