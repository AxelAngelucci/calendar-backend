"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidationResult_1 = __importDefault(require("../helpers/customValidationResult"));
const validateParam = [
    (0, express_validator_1.param)('date').matches(/^\d{4}-\d{2}-\d{2}$/),
    (req, res, next) => (0, customValidationResult_1.default)(req, res, next, "Please provide a valid date in format: YYYY-MM-DD")
];
exports.default = validateParam;
//# sourceMappingURL=validateParam.middleware.js.map