import mongoose from "mongoose";
import { IOrder } from "../../models/IOrder";

const IOrderSchema = new mongoose.Schema<IOrder>({
    pname: {type: String, required: true },
    prno: {type: Number, required: true },
    price: {type: Number, required: true },
    qty: {type: Number, required: true },
    company: {type: String, required: true },         
}, {timestamps: true});

const GroupsTable = mongoose.model<IOrder>('groups', IOrderSchema);

export default IOrderSchema;