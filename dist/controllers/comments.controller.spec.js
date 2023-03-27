// import db from "../config/db";
// import { getAllCommentsInCollection, setNewComment } from "./comments.controller";
// // Tests that a new comment is created with a unique id and stored in the database when valid request body and parameters are provided. tags: [happy path]
// it("test_valid_comment_creation", async () => {
//     const req = {
//         params: { date: "2022-01-01" },
//         body: { comment: "Great post!", name: "John Doe", actualDate: "2022-01-01" }
//     };
//     const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };
//     await setNewComment(req, res);
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//         comment: "Great post!",
//         name: "John Doe",
//         actualDate: "2022-01-01"
//     });
// });
// // Tests that an error message is returned when an empty request body is provided. tags: [edge case]
// it("test_empty_request_body", async () => {
//     const req = {
//         params: { date: "2022-01-01" },
//         body: {}
//     };
//     const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };
//     await setNewComment(req, res);
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
// });
// // Tests that an error message is returned when an invalid date format is provided in the request parameters. tags: [edge case]
// it("test_invalid_date_format", async () => {
//     const req = {
//         params: { date: "2022/01/01" },
//         body: { comment: "Great post!", name: "John Doe", actualDate: "2022-01-01" }
//     };
//     const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };
//     await setNewComment(req, res);
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
// });
// // Tests that an error message is returned when invalid request parameters are provided. tags: [other possible issue]
// it("test_invalid_request_parameters", async () => {
//     const req = {
//         params: { date: "2022-01-01" },
//         body: { comment: "This is a comment", name: "John Doe", actualDate: "2022-01-01" }
//     };
//     const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };
//     db().collection = jest.fn().mockReturnValue({
//         doc: jest.fn().mockReturnValue({
//             set: jest.fn().mockImplementation(() => {
//                 throw new Error("Invalid request parameters");
//             })
//         })
//     });
//     await setNewComment(req, res);
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({ message: "Invalid request parameters" });
// });
//     // Tests that the function successfully retrieves all comments from the specified collection and returns them as a json response. tags: [happy path]
//     it("test_retrieves_all_comments", async () => {
//         const mockReq = { params: { date: "2022-01-01" } };
//         const mockRes = { json: jest.fn() };
//         const mockData = [{ comment: "test comment" }];
//         const mockGet = jest.fn().mockResolvedValueOnce({ forEach: (callback) => callback({ data: () => mockData[0] }) });
//         const mockCollection = jest.fn().mockReturnValueOnce({ get: mockGet });
//         const mockDb = jest.fn().mockReturnValueOnce({ collection: mockCollection });
//         jest.mock("../config/db", () => mockDb);
//         await getAllCommentsInCollection(mockReq, mockRes);
//         expect(mockDb).toHaveBeenCalled();
//         expect(mockCollection).toHaveBeenCalledWith("2022-01-01");
//         expect(mockGet).toHaveBeenCalled();
//         expect(mockRes.json).toHaveBeenCalledWith(mockData);
//     });
//     // Tests that the function sends a 500 internal server error response if the specified collection does not exist in the database. tags: [edge case]
//     it("test_collection_does_not_exist", async () => {
//         const mockReq = { params: { date: "2022-01-01" } };
//         const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//         const mockGet = jest.fn().mockRejectedValueOnce({ code: "not-found" });
//         const mockCollection = jest.fn().mockReturnValueOnce({ get: mockGet });
//         const mockDb = jest.fn().mockReturnValueOnce({ collection: mockCollection });
//         jest.mock("../config/db", () => mockDb);
//         await getAllCommentsInCollection(mockReq, mockRes);
//         expect(mockDb).toHaveBeenCalled();
//         expect(mockCollection).toHaveBeenCalledWith("2022-01-01");
//         expect(mockGet).toHaveBeenCalled();
//         expect(mockRes.status).toHaveBeenCalledWith(500);
//         expect(mockRes.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
//     });
//     // Tests that the function sends a 500 internal server error response if the specified date parameter is not in the correct format. tags: [edge case]
//     it("test_incorrect_date_format", async () => {
//         const mockReq = { params: { date: "2022/01/01" } };
//         const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//         const mockCollection = jest.fn();
//         const mockDb = jest.fn().mockReturnValueOnce({ collection: mockCollection });
//         jest.mock("../config/db", () => mockDb);
//         await getAllCommentsInCollection(mockReq, mockRes);
//         expect(mockDb).toHaveBeenCalled();
//         expect(mockCollection).not.toHaveBeenCalled();
//         expect(mockRes.status).toHaveBeenCalledWith(500);
//         expect(mockRes.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
//     });
//     // Tests that the function handles asynchronous operations using async/await syntax. tags: [behavior]
//     it("test_async_operations", async () => {
//         const req = { params: { date: "2022-01-01" } };
//         const res = { json: jest.fn() };
//         await getAllCommentsInCollection(req, res);
//         expect(res.json).toHaveBeenCalled();
//     });
//     // Tests that the function sends a 500 internal server error response if an error occurs. tags: [behavior]
//     it("test_error_handling", async () => {
//         const req = { params: { date: "2022-01-01" } };
//         const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//         const error = new Error("Internal Server Error");
//         db().collection = jest.fn().mockImplementation(() => {
//             throw error;
//         });
//         await getAllCommentsInCollection(req, res);
//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
//     });
//     // Tests that the function assumes that the database connection is established and available. tags: [other possible issue]
//     it("test_database_connection", async () => {
//         const req = { params: { date: "2022-01-01" } };
//         const res = { json: jest.fn() };
//         const mockGet = jest.fn().mockResolvedValue([{ data: jest.fn() }]);
//         db().collection = jest.fn().mockReturnValue({ get: mockGet });
//         await getAllCommentsInCollection(req, res);
//         expect(db().collection).toHaveBeenCalledWith("2022-01-01");
//         expect(mockGet).toHaveBeenCalled();
//     });
//# sourceMappingURL=comments.controller.spec.js.map