import { Request,Response, Router, response } from "express";
import *as Contactcontrollar from "../controllar/UserControllar" 
import { body } from "express-validator"; 

const UserRouter:Router = Router();

/**
 * @usage : to get all User
 * @method : get
 * @param:no - params
 * @url:http//localhost:9002/User
 */
UserRouter.get("/", async(req:Request,res:Response)=>{
    await Contactcontrollar.GetAllContact(req,res);
});
/**
@usage : get a contact
@method : GET
@params : no-params
@url : http://localhost:9002/User/:User_Id
 */
UserRouter.get("/:User_Id", async (request: Request,
    response: Response) => {
     await Contactcontrollar.GetContact(request, response);
    });
/**
@usage : create a contact
@method : POST
@params : name, imageUrl, email, mobile, company, title, groupId
@url :http://localhost:9002/User
 */
UserRouter.post("/",[
    body('User_Id').not().isEmpty().withMessage("User ID is Required"),
    body('name').not().isEmpty().withMessage("Name is Required"),
    body('imageUrl').not().isEmpty().withMessage("imageUrl isRequired"),
    body('email').not().isEmpty().withMessage("email isRequired"),
    body('mobile').not().isEmpty().withMessage("mobile isRequired"), 
    body('address').not().isEmpty().withMessage("address isRequired"), 
],async(req:Request,res:Response) => {
    await Contactcontrollar.CreateContact(req,res);
    console.log(req.body)
})
/**
 @usage : Update a contact
 @method : PUT
 @params : name, imageUrl, email, mobile, company, title, groupId
 @url :http://localhost:9002/User/:User_Id
 */
UserRouter.put("/:User_Id",[body('name').not().isEmpty().withMessage("Name is Required"),
    body('User_ID').not().isEmpty().withMessage("User ID is Required"),
    body('imageUrl').not().isEmpty().withMessage("imageUrl isRequired"),
    body('email').not().isEmpty().withMessage("email isRequired"),
    body('mobile').not().isEmpty().withMessage("mobile isRequired"),
    body('company').not().isEmpty().withMessage("company isRequired"),
    body('title').not().isEmpty().withMessage("title isRequired"),
    body('groupId').not().isEmpty().withMessage("groupId isRequired"),
    ],async(request:Request,response:Response) => {
    await Contactcontrollar.updateContact(request,response);
})
/**
@usage : Delete a contact
@method : DELETE
@params : no-params
@url : http://localhost:9002/User/:User_Id
 */
UserRouter.delete("/:User_Id", async (request: Request,
    response: Response) => {
     await Contactcontrollar.deleteContact(request, response);
    });

export default UserRouter;