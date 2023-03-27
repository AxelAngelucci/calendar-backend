import express from 'express';
import commentsRouter from './routes/comments.routes';
import "dotenv/config.js";
import db from './config/db';
import cors from 'cors';
import morgan from "morgan"

const app = express();

const port = process.env.PORT || 8080;
db();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan())

app.use(commentsRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});