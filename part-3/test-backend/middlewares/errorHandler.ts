import { NextFunction, Request, Response, response } from "express";
import mongoose from "mongoose";

const errorHandler = (error:any,req:Request, res:Response, next:NextFunction) =>{
    if(error instanceof mongoose.Error.CastError){
        console.log('malformatted id');
        return res.status(400).json({error:'malformatted id'});
    }else if(error instanceof mongoose.Error.ValidationError){
        console.log('validation error:',error.message);
        return res.status(400).json({error:error.message});
    }else{
        console.log('internal server error');
        return res.status(500).json({error:error.message});
    }
}

module.exports = errorHandler;