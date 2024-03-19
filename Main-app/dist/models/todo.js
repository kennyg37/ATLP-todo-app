"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
const todoschema = new mongoose_1.default.Schema({
    ID: { type: Number, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
}, {
    toJSON: {
        transform: (doc, ret) => {
            return {
                ID: ret.ID,
                title: ret.title,
                description: ret.description,
                status: ret.status,
                startDate: ret.startDate,
                endDate: ret.endDate,
                _id: ret._id
            };
        }
    }
});
exports.default = mongoose_1.default.model('Todo', todoschema);
//# sourceMappingURL=Todo.js.map