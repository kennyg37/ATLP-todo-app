"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Todo_1 = __importDefault(require("../models/Todo"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.use(authMiddleware_1.default);
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
router.get('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_1.default.find();
        res.json(todos);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_1.default.find();
        res.json(todos);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Add a new todo
 *     responses:
 *       200:
 *         description: todo added successfully
 *       404:
 *         description: couldn't add todo
 */
router.post('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Received POST request for creating a new todo');
    const ID = Math.floor(Math.random() * 1000);
    const { title, description, status, startDate, endDate } = req.body;
    const todo = new Todo_1.default({
        ID,
        title,
        description,
        status,
        startDate,
        endDate
    });
    yield todo.save();
    res.json(todo);
}));
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
router.put('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, startDate, endDate } = req.body;
    const { id } = req.params;
    const todo = yield Todo_1.default.findByIdAndUpdate({ _id: id }, {
        title,
        description,
        status,
        startDate,
        endDate
    });
    res.json('todo updated successfully');
    res.json(todo);
}));
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
router.delete('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Todo_1.default.findByIdAndDelete({ _id: id });
    res.json('todo deleted successfully');
}));
exports.default = router;
//# sourceMappingURL=todoRoutes.js.map