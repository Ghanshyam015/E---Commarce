import mongoose from "mongoose";
import { IProCat } from "../../models/IProCat";

const IProCatSchema = new mongoose.Schema<IProCat>({
    pname : { type :String ,required:true },
    prno : {type:Number , required:true},
    Categary:{type:String,required:true}
},{timestamps:true})

const ProCatTable = mongoose.model<IProCat>('ProductCategary',
IProCatSchema);
export default ProCatTable;