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
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield Todo_1.default.find();
    res.json(todos);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Received POST request for creating a new todo');
    const { title, description, status, startDate, endDate } = req.body;
    const todo = new Todo_1.default({
        title,
        description,
        status,
        startDate,
        endDate
    });
    yield todo.save();
    res.json(todo);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, startDate, endDate } = req.body;
    const { id } = req.params;
    const todo = yield Todo_1.default.findByIdAndUpdate(id, {
        title,
        description,
        status,
        startDate,
        endDate
    });
    res.json('todo updataed successfully');
}));
router.delete(':/id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Todo_1.default.findByIdAndDelete(id);
    res.json('todo deleted successfully');
}));
exports.default = router;
//# sourceMappingURL=todoRoutes.js.map