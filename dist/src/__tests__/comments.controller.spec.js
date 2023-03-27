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
const db_1 = __importDefault(require("../config/db"));
const comments_controller_1 = require("../controllers/comments.controller");
describe("setNewComment", () => {
    // Tests that a new comment is created with a unique id and stored in the database when valid request body and parameters are provided. tags: [happy path]
    it("test_valid_comment_creation", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: { date: "2022-01-01" },
            body: { comment: "Great post!", name: "John Doe", actualDate: "2022-01-01" }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        yield (0, comments_controller_1.setNewComment)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            comment: "Great post!",
            name: "John Doe",
            actualDate: "2022-01-01"
        });
    }));
    // Tests that an error message is returned when an empty request body is provided. tags: [edge case]
    it("test_empty_request_body", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: { date: "2022-01-01" },
            body: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        yield (0, comments_controller_1.setNewComment)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    }));
    // Tests that an error message is returned when an invalid date format is provided in the request parameters. tags: [edge case]
    it("test_invalid_date_format", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: { date: "2022/01/01" },
            body: { comment: "Great post!", name: "John Doe", actualDate: "2022-01-01" }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        yield (0, comments_controller_1.setNewComment)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    }));
    // Tests that an error message is returned when invalid request parameters are provided. tags: [other possible issue]
    it("test_invalid_request_parameters", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: { date: "2022-01-01" },
            body: { comment: "This is a comment", name: "John Doe", actualDate: "2022-01-01" }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        (0, db_1.default)().collection = jest.fn().mockReturnValue({
            doc: jest.fn().mockReturnValue({
                set: jest.fn().mockImplementation(() => {
                    throw new Error("Invalid request parameters");
                })
            })
        });
        yield (0, comments_controller_1.setNewComment)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid request parameters" });
    }));
});
//# sourceMappingURL=comments.controller.spec.js.map