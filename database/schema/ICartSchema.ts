import mongoose from "mongoose";
import { ICart } from "../../models/ICart";

const ICartSchema = new mongoose.Schema<ICart>({ 
    prno:{type:Number,required:true},
    qty:{type:Number,required:true} 
},{timestamps:true})

const CartTable = mongoose.model<ICart>('contacts',
ICartSchema);
export default CartTable;