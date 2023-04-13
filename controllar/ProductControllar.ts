import {Request,Response} from "express";  
import ProductTable from "../database/schema/IProSchema";
import { APP_STATUS } from "../constants/Constant";
import { IProduct } from "../models/IProduct";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

export const getAllGroups = async (request:Request,response:Response) => {
    try {
        let Products: IProduct[] | undefined = await ProductTable.find();
        
        if (Products) {
            return response.status(200).json(Products);
        }
        } catch (error: any) {
            return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
            });
        }
    
}


export const CreateProduct = async (request:Request,response:Response) => {
    const errors = validationResult(request);
 
    if (!errors.isEmpty()) {
        return response.status(400).json({errors:errors.array()});
    }
    try {
        let {pname,prno,stock} = request.body;
        // check if the name already exists
        let Product: IProduct | null | undefined = await ProductTable.findOne({prno:prno});
        if (Product) {
            return response.status(400).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: "Product is already Exists"
            });
        }
        let ThePr : IProduct = {
            pname:pname,
            prno:prno,
            stock:stock
        }
        console.log(ThePr);
        ThePr = await new ProductTable(ThePr).save();
        if(ThePr){
            return response.status(200).json({
                ThePr
            })
        }
    // let Products: IProduct | null | undefined = await new ProductTable({prno: prno}).save();
    
    // if (Products) {
    //     return response.status(200).json({
    //     status: APP_STATUS.SUCCESS,
    //     data: Products,
    //     msg: "Product is Added Successfully..."
    //     });
    // }
    } catch (error: any) {
        return response.status(500).json({
        status: APP_STATUS.FAILED,
        data: null,
        error: error.message
        });
    
    }
}
export const getProduct = async (request:Request,response:Response) => {
    try {
        let {prno} = request.params;
        if(prno){ 
        const mongoGroupId = new mongoose.Types.ObjectId(prno);
        let Product: IProduct | undefined | null = await ProductTable.findById(mongoGroupId);
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

