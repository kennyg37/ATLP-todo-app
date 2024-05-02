import { Hash } from "crypto";
import mongoose, {Document} from "mongoose";

export  interface IAuth extends Document {
    username: string,
    email: string,
    password: string,
}

const authSchema = new mongoose.Schema ({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true}
},
{
    toJSON: {
        transform: (doc, ret) => {
            return {
                username: ret.username,
                email: ret.email,
                password: ret.password,
                _id: ret._id
            }
        }
    }
}

);
// const loginSchema = new mongoose.Schema({
//     username: {type: String, required: true},
//     password: {type: String, required: true}
// },
// {
//     toJSON: {
//         transform: (doc, ret) => {
//             return{
//                 username: ret.username,
//                 password: ret.password
//             }
//         }
//     }
// }
// )

export default mongoose.model<IAuth>('Auth', authSchema);
