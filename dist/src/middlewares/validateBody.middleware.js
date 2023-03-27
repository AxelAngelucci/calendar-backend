"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidationResult_1 = __importDefault(require("../helpers/customValidationResult"));
const validateBody = [
    (0, express_validator_1.check)('name').exists().isLength({ min: 2, max: 20 }).withMessage("The name must bee between 2 and 20 characters"),
    (0, express_validator_1.check)('comment').exists().isLength({ min: 5, max: 200 }).withMessage("The name must bee between 2 and 20 characters"),
    (req, res, next) => (0, customValidationResult_1.default)(req, res, next, "Please verify the inputs")
];
exports.default = validateBody;
//# sourceMappingURL=validateBody.middleware.js.map