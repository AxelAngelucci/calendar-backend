import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator'
const customValidationResult = (req: Request, res: Response, next: NextFunction, message: string) => {
    try {
        validationResult(req).throw();
        return next()
    } catch (error) {
        res.status(403);
        res.send({ message, errors: error.array() });
    }
}

export default customValidationResult;