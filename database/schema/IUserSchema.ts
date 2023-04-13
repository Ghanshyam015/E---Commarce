import mongoose from "mongoose";
import { IUser } from "../../models/IUser";
const IUserSchema = new mongoose.Schema<IUser>({
    name: {type: String, required: true},
    imageUrl: {type: String, required: true},
    mobile: {type: String, required: true, unique: true},
    email: {type: String, required: true},  
    address: {type: String, required: true},  
    // pincode: {type: Number, required: true},  
    // state: {type: String, required: true},  
}, {timestamps: true});
const UserTable = mongoose.model<IUser>('contacts',
IUserSchema);
export default UserTable;