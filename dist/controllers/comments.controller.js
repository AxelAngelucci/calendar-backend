"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCommentsInCollection = exports.setNewComment = void 0;
const db_1 = __importDefault(require("../config/db"));
const setNewComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Date.now().toString();
        const { date } = req.params;
        const { comment, name, actualDate } = req.body;
        const newComment = {
            comment,
            name,
            actualDate
        };
        const newCommentt = yield (0, db_1.default)().collection(date).doc(id).set(newComment);
        return res.status(200).json(newComment);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.setNewComment = setNewComment;
const getAllCommentsInCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.params;
        const comments = (0, db_1.default)().collection(date);
        const response = yield comments.get();
        const responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.json(responseArr);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllCommentsInCollection = getAllCommentsInCollection;
//# sourceMappingURL=comments.controller.js.map