import { Request, Response } from "express";
import db from "../config/db";

const setNewComment = async (req: Request, res: Response) => {
    try {
        const id = Date.now().toString();
        const { date } = req.params;
        const { comment, name } = req.body;
        const newComment = {
            comment,
            name,
            date
        }
        await db().collection(date).doc(id).set(newComment);
        return res.status(200).json(newComment);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAllCommentsInCollection = async (req: Request, res: Response) => {
    try {
        const { date } = req.params;
        const comments = db().collection(date);
        const response = await comments.get();
        const responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        })
        res.json(responseArr)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
export { setNewComment, getAllCommentsInCollection }