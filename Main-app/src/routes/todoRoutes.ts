import express, { Request, Response } from 'express';
import Todo from '../models/Todo';

const router = express.Router();

router.get('/todos', async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/', async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/todos', async (req: Request, res: Response) => {
    console.log('Received POST request for creating a new todo');

    const ID = Math.floor(Math.random() * 1000);
    const { title, description, status, startDate, endDate } = req.body;
    const todo = new Todo({
        ID,
        title,
        description,
        status,
        startDate,
        endDate
    });
    await todo.save();
    res.json(todo);
});

router.put('/todos/:id', async (req: Request, res: Response) => {
    const { title, description, status, startDate, endDate } = req.body;
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate({_id: id}, {
        title,
        description,
        status,
        startDate,
        endDate
    });
    res.json('todo updated successfully'); 
});

router.delete('/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete({_id: id});
    res.json('todo deleted successfully');
});

export default router;