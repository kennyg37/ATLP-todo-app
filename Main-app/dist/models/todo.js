"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
const todoschema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});
exports.default = mongoose_1.default.model('Todo', todoschema);
//# sourceMappingURL=Todo.js.map