import { Router , Request, Response, response } from "express";
import *as groupControllar from "../controllar/ProductControllar" 
import { body } from "express-validator";
import { request } from "http";

const ProductRouter : Router = Router();

/**
 * @usage : to get all groups
 * @method : get
 * @param:no - params
 * @url:http//localhost:9000/groups
 */
ProductRouter.get("/", async(req:Request,res:Response)=>{
    await groupControllar.getAllGroups(req,res);
});
/**
 * @usage : create group
 * @method : post
 * @param:no - params
 * @url:http//localhost:9002/Products
 */
ProductRouter.post("/",[
    body('pname').not().isEmpty().withMessage("Product is Required"),
    body('prno').not().isEmpty().withMessage("Product Nomber is Required...") ,
    body('stock').not().isEmpty().withMessage("Product Nomber is Required...") 
        ],async(req:Request,res:Response) => {
            await groupControllar.CreateProduct(req,res);
        })
/**
 * @usage : to getgroup
 * @method : get
 * @param:no - params
 * @url:http//localhost:9002/groups/`
 */
ProductRouter.get("/:groupsid",[],async(req:Request,res:Response) => {
    await groupControllar.getProduct(req,res);
})

export default ProductRouter;