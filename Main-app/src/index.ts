import express, { Request, Response } from 'express';
import mongoose, { Document } from 'mongoose';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/todos');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});