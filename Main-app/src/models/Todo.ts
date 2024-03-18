import mongoose, {Document} from "mongoose";

interface ITodo extends Document {
    title: string;
    description: string;
    status: boolean;
    startDate: Date;
    endDate: Date;
};

const todoschema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

export default mongoose.model<ITodo>('Todo', todoschema);