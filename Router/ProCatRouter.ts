import { Response , Request , Router } from "express";
import *as ProCatControllar from "../controllar/ProCatControllar"
import ProCatTable from "../database/schema/IProCatSchema";
import { body } from "express-validator";
import { request } from "http";

const ProCatRouter : Router = Router();

ProCatRouter.get("/",async(request:Request,response:Response) => {
    await ProCatControllar.GetAllProCat(request,response);
}) 
ProCatRouter.get("/Search/:",async(request:Request,response:Response) => {
    await ProCatControllar.getProCat(request,response);  
    
})
ProCatRouter.post("/",[
    body("pname").not().isEmpty().withMessage("Product Name Is Required..."),
    body("prno").not().isEmpty().withMessage("Product No Is Required..."),
    body("Categary").not().isEmpty().withMessage("Product Categary Is Required...")
],async(request:Request,response:Response) => {
    await ProCatControllar.CreateProCat(request,response);
})
ProCatRouter.put("/Edit/:EditId",[
    body("pname").not().isEmpty().withMessage("Product Name Is Required..."),
    body("prno").not().isEmpty().withMessage("Product No Is Required..."),
    body("Categary").not().isEmpty().withMessage("Product Categary Is Required...")
],async(request:Request,response:Response) => {
    await ProCatControllar.GetAllProCat(request,response);  

})
// ProCatRouter.delete("/Delete/:DeleteId",async(request:Request,response:Response) => {

// })
export default ProCatRouter;