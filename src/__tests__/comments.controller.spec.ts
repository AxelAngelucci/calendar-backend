import db from "../config/db";
import { getAllCommentsInCollection, setNewComment } from "../controllers/comments.controller";

describe("setNewComment", () => {
    it("TEST_CREATE_COMMENT", async () => {
        const req = {
            params: { date: "2022-01-01" },
            body: { comment: "Great post!", name: "Axel Angelucci", actualDate: "2022-01-01" }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await setNewComment(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            comment: "Great post!",
            name: "Axel Angelucci",
            actualDate: "2022-03-03"
        });
    });

    it("TEST_EMPTY_BODY", async () => {
        const req = {
            params: { date: "2022-03-03" },
            body: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await setNewComment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });

    it("INVALID_DATE_FORMAT", async () => {
        const req = {
            params: { date: "20220101" },
            body: { comment: "Great post!", name: "Axel Angelucci", actualDate: "2022-01-01" }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await setNewComment(req, res);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Please provide a valid date in format: YYYY-MM-DD' });
    });

    it("INVALID_REQUEST_PARAMETERS", async () => {
        const req = {
            params: { date: "2022-01-01" },
            body: { comment: "This is a comment", name: "Axel Angelucci", actualDate: "2022-01-01" }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        db().collection = jest.fn().mockReturnValue({
            doc: jest.fn().mockReturnValue({
                set: jest.fn().mockImplementation(() => {
                    throw new Error("Invalid request parameters");
                })
            })
        });
        await setNewComment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });

    it("MISSING_FIELDS", async () => {
        const req = {
            params: { date: "2022-01-01" },
            body: { comment: "Great post!", actualDate: "2022-01-01" }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await setNewComment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });

    it("TOO_LONG_FIELDS", async () => {
        const req = {
            params: { date: "2022-01-01" },
            body: {
                comment: "a".repeat(1001),
                name: "a".repeat(51),
                actualDate: "2022-01-01T00:00:00.000Z"
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await setNewComment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });


})

