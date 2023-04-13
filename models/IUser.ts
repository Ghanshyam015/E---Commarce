export interface IUser {
    _id?:string;
    User_ID:Number;
    name:string; 
    imageUrl:string;
    mobile:string;
    email:string;
    address:String; 
    createdAt?:Date;
    updatedAt?:Date;
}