import { Request,Response } from "express";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { IUser } from "../models/IUser";
import {APP_STATUS} from "../constants/Constant";
import UserTable from "../database/schema/IUserSchema";

export const GetAllContact  = async (req:Request,Res:Response) => {
    try {
        let contacts: IUser[] | undefined  = await UserTable.find(); // select * from contacts;
        console.log(contacts)   
        if (contacts) {
            console.log(contacts)
            return Res.status(200).json(contacts);
        }
        } catch (error: any) {
            return Res.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
            });
        }
}
export const CreateContact  = async (request:Request,response:Response) => {
    try {
        // read the form data
        let {User_ID,name, imageUrl, email, mobile,address } = request.body;
        // check if the mobile exists
        let contact = await UserTable.findOne({mobile: mobile});
        if (contact) {
            return response.status(400).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: "Mobile number is already exists"
        });
    }
 // create
    let theUser: IUser = {
        User_ID:User_ID,
        name: name,
        imageUrl: imageUrl,
        email: email,
        mobile: mobile ,
        address:address 
    }
    theUser = await new UserTable(theUser).save();
    if (theUser) {
        return response.status(200).json(theUser);
    }
    } catch (error: any) {
        return response.status(500).json({
        status: APP_STATUS.FAILED,
        data: null,
        error: error.message
        });
 
    }
}
export const GetContact  = async (req:Request,Res:Response) => {
    try {
        let {contactId} = req.params;
        if (contactId) {
        const mongoContactId = new mongoose.Types.ObjectId(contactId); // string -> mongo id
        const contact: IUser | undefined | null = await UserTable.findById(mongoContactId);
    if (!contact) {
        return Res.status(404).json({
        status: APP_STATUS.FAILED,
        data: null,
        error: "No User found"
        });
    }
    return Res.status(200).json(contact);
    }
    } catch (error: any) {
        return Res.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
            });
        }
    }
/**
@usage : Update a contact
@method : PUT
@params : name, imageUrl, email, mobile, company, title, groupId
@url : http://localhost:9000/contacts/:contactId
 */
export const updateContact = async (request: Request, response: Response) => {
    const errors = validationResult(request);  
        console.log(request.params);
        const {contactId} = request.params;
        console.log(errors);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors:
            errors.array()});
        }
        try {
        // read the form data
        let {User_ID,name, imageUrl, email, mobile,address} = request.body;
        // check if the contact exists
        const mongoContactId = new mongoose.Types.ObjectId(contactId);
        let contact: IUser | null | undefined = await UserTable.findById(mongoContactId);
        if (!contact) {
            return response.status(404).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: "Contact is not found"
            });
        }
        // update
        let theContactObj: IUser | null = {
            User_ID:User_ID,
            name: name,
            imageUrl: imageUrl,
            email: email,
            mobile: mobile,
            address:address
            // title: title,
            // groupid: groupId
        }
        theContactObj = await UserTable.findByIdAndUpdate(mongoContactId, {
            $set: theContactObj
        }, {new: true})
        if (theContactObj) {
            return response.status(200).json(theContactObj);
        }
        } catch (error: any) {
            return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
            });
        }
    }
    /**
@usage : Delete a contact
@method : DELETE
@params : no-params
@url : http://localhost:9000/contacts/:contactId
 */
export const deleteContact = async (request: Request, response: Response) => {
        try {
            let {contactId} = request.params;
            if (contactId) {
        
        const mongoContactId = new mongoose.Types.ObjectId(contactId); // string -> mongo id
        const contact: IUser | undefined | null = await UserTable.findById(mongoContactId);
        
        if (!contact) {
            return response.status(404).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: "No Contact found"
            });
        }
        let theContact: IUser | null = await UserTable.findByIdAndDelete(mongoContactId);
        if (theContact) {
                return response.status(200).json({});
        }
        }
        } catch (error: any) {
            return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
            });
        }
    }