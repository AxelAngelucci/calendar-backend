import { NextFunction, Request, Response } from 'express';
import { param, validationResult } from 'express-validator'
import customValidationResult from '../helpers/customValidationResult';

const validateParam = [
    param('date').matches(/^\d{4}-\d{2}-\d{2}$/),
    (req: Request, res: Response, next: NextFunction) => customValidationResult(req, res, next, "Please provide a valid date in format: YYYY-MM-DD")
];

export default validateParam;