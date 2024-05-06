import express, { Request, Response } from 'express';
import Todo from '../models/Todo';
import {verifyToken} from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     responses:
 *       200:
 *         description: A list of todos
 *       404:
 *         description: Todos not found
 */
router.get('/todos/data', async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /api/todos/create:
 *   post:
 *     summary: Add a new todo
 *     responses:
 *       200:
 *         description: todo added successfully
 *       404:
 *         description: couldn't add todo
 */
router.post('/todos/create', verifyToken, async (req: Request, res: Response) => {
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
/**
 * @swagger
 * /api/todos:
 *   put:
 *     summary: modify todo
 *     responses:
 *       200:
 *         description: Todo modified successfully
 *       404:
 *         description: Couldn't find todo
 */
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
    res.json(todo)
});
/**
 * @swagger
 * /api/todos:
 *   delete:
 *     summary: delete todo
 *     responses:
 *       200:
 *         description: todo deleted successfully
 *       404:
 *         description: Todo couldn't be deleted
 */
router.delete('/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete({_id: id});
    res.json('todo deleted successfully');
});

export default router;