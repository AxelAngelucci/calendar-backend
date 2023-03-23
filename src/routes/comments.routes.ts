import express from 'express'
import { setNewComment, getAllCommentsInCollection } from '../controllers/comments.controller';
import validateParam from '../middlewares/validateParam.middleware';
import validateBody from '../middlewares/validateBody.middleware';
const commentsRouter = express.Router();

commentsRouter
    .route('/comments/:date')
    .post(validateParam, validateBody, setNewComment)
    .get(validateParam, getAllCommentsInCollection);

export default commentsRouter;