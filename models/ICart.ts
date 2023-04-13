export interface ICart {
    _id?:string;
    pname:string;
    prno:Number;
    price:Number;
    qty:Number;
    company:string; 
    createdAt?:Date;
    updatedAt?:Date;
}