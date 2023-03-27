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
    it("TEST_CREATE_COMMENT", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: { date: "2022-01-01" },
            body: { comment: "Great post!", name: "Axel Angelucci", actualDate: "2022-01-01" }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        yield (0, comments_controller_1.setNewComment)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            comment: "Great post!",
            name: "Axel Angelucci",
            actualDate: "2022-03-03"
        });
    }));
    it("TEST_EMPTY_BODY", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: { date: "2022-03-03" },
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
    it("INVALID_DATE_FORMAT", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: { date: "20220101" },
            body: { comment: "Great post!", name: "Axel Angelucci", actualDate: "2022-01-01" }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        yield (0, comments_controller_1.setNewComment)(req, res);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Please provide a valid date in format: YYYY-MM-DD' });
    }));
    it("INVALID_REQUEST_PARAMETERS", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: { date: "2022-01-01" },
            body: { comment: "This is a comment", name: "Axel Angelucci", actualDate: "2022-01-01" }
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
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    }));
    it("MISSING_FIELDS", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: { date: "2022-01-01" },
            body: { comment: "Great post!", actualDate: "2022-01-01" }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        yield (0, comments_controller_1.setNewComment)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    }));
    it("TOO_LONG_FIELDS", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: { date: "2022-01-01" },
            body: {
                comment: "a".repeat(1001),
                name: "a".repeat(51),
                actualDate: "2022-01-01T00:00:00.000Z"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        yield (0, comments_controller_1.setNewComment)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    }));
});
//# sourceMappingURL=comments.controller.spec.js.map