import { Request, Response } from "express";
import db from "../config/db";

const setNewComment = async (req, res) => {
    try {
        const id = Date.now().toString();
        const { date } = req.params;
        const { comment, name, actualDate } = req.body;
        const newComment = {
            comment,
            name,
            actualDate
        }
        const newCommentt = await db().collection(date).doc(id).set(newComment);
        return res.status(200).json(newComment);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAllCommentsInCollection = async (req, res) => {
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