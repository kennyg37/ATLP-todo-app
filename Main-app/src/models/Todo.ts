import mongoose, {Document} from "mongoose";

export interface ITodo extends Document {
    ID: number;
    title: string;
    description: string;
    status: string;
    startDate: Date;
    endDate: Date;
};

const todoschema = new mongoose.Schema({
    ID : { type: Number, unique: true, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
},
{
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

export default mongoose.model<ITodo>('Todo', todoschema);