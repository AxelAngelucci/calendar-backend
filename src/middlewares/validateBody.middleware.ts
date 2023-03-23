import { check } from 'express-validator';
import customValidationResult from '../helpers/customValidationResult';
import { NextFunction, Request, Response } from 'express';
const validateBody = [
    check('name').exists().isLength({ min: 2, max: 20 }).withMessage("The name must bee between 2 and 20 characters"),
    check('comment').exists().isLength({ min: 5, max: 200 }).withMessage("The name must bee between 2 and 20 characters"),
    (req: Request, res: Response, next: NextFunction) => customValidationResult(req, res, next, "Please verify the inputs")
];

export default validateBody;