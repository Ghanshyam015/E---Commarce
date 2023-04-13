import mongoose from "mongoose";
import { IProduct } from "../../models/IProduct";
const IProductSchema = new mongoose.Schema<IProduct>({
        pname : { type : String , required:true},
        prno : { type : Number , required:true},
        stock : { type : Number , required : true}
},{timestamps:true});

const ProductTable = mongoose.model<IProduct>('Product', IProductSchema);
export default ProductTable;