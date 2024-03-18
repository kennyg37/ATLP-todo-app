import express, { Request, Response } from 'express';
import Todo from '../models/Todo';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const todos = await Todo.find();
    res.json(todos);
});

router.post('/', async (req: Request, res: Response) => {
    console.log('Received POST request for creating a new todo');
    const { title, description, status, startDate, endDate } = req.body;
    const todo = new Todo({
        title,
        description,
        status,
        startDate,
        endDate
    });
    await todo.save();
    res.json(todo);
});

router.put('/:id', async (req: Request, res: Response) => {
    const { title, description, status, startDate, endDate } = req.body;
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, {
        title,
        description,
        status,
        startDate,
        endDate
    });
    res.json('todo updataed successfully'); 
});

router.delete(':/id', async (req: Request, res: Response) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json('todo deleted successfully');
});

export default router;