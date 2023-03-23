"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidationResult = (req, res, next, message) => {
    try {
        (0, express_validator_1.validationResult)(req).throw();
        return next();
    }
    catch (error) {
        res.status(403);
        res.send({ message, errors: error.array() });
    }
};
exports.default = customValidationResult;
//# sourceMappingURL=customValidationResult.js.map