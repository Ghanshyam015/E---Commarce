import mongoose from "mongoose";
import ProCatTable from "../database/schema/IProCatSchema";
import { validationResult } from "express-validator";
import { IProCat } from "../models/IProCat";
import { APP_STATUS } from "../constants/Constant"; 
import { Request , Response } from "express";
import { error } from "console";
import { request } from "http";

export const CreateProCat = async (request:Request,response:Response) => {
    const error = validationResult(request)
    if (!error.isEmpty()) {
        return response.status(400).json({errors:error.array()});
    }
    try {
        let {pname,prno,Categary } = request.body;
        let PC: IProCat[] | undefined | null = await ProCatTable.findOne({prno:prno});
        
        if (PC) {
            return response.status(400).json({ status: APP_STATUS.FAILED,
                data: null,
                error: "Product is already Exists"
                });
        }
        let ThePC : IProCat = {
            pname:pname,
            prno:prno,
            Categary:Categary
        }
        console.log(ThePC);
        ThePC = await new ProCatTable(ThePC).save();
        if(ThePC){
            return response.status(200).json({
                ThePC
            })
        }

        }
         catch (error: any) {
            return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
            });
        }
         
}

export const getProCat = async (request:Request,response:Response) => {
    try {
        let {prno} = request.params;
        if(prno){ 
        const mongoGroupId = new mongoose.Types.ObjectId(prno);
        let Product: IProCat | undefined | null = await ProCatTable.findById(prno);
        if (!Product) {
            return response.status(404).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: "No Product is found"
            }); 
        }
        return response.status(200).json(Product);
        }
        } catch (error: any) {
            return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
            });
        }
    }
export const GetAllProCat = async (request:Request,response:Response) => {
    try{ 
    let ProCat : IProCat[] | undefined =await ProCatTable.find();

    if(ProCat){
        return response.status(200).json({ProCat})
        }
    }catch(error:any){
        return response.status(500).json({
        status:APP_STATUS.FAILED,
        data:null,
        error:error.message
    }) 

    }

}    