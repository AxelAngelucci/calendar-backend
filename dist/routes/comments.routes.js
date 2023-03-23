"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comments_controller_1 = require("../controllers/comments.controller");
const validateParam_middleware_1 = __importDefault(require("../middlewares/validateParam.middleware"));
const validateBody_middleware_1 = __importDefault(require("../middlewares/validateBody.middleware"));
const commentsRouter = express_1.default.Router();
commentsRouter
    .route('/comments/:date')
    .post(validateParam_middleware_1.default, validateBody_middleware_1.default, comments_controller_1.setNewComment)
    .get(validateParam_middleware_1.default, comments_controller_1.getAllCommentsInCollection);
exports.default = commentsRouter;
//# sourceMappingURL=comments.routes.js.map