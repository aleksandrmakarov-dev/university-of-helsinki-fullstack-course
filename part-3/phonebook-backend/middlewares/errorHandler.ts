import express from "express";
import mongoose from "mongoose";

const errorHandler = (error:any,req:express.Request,res:express.Response, next:express.NextFunction) =>{
    if(error instanceof mongoose.Error.CastError){
        return res.status(400).json({error: 'malformatted id'});
    }else if(error instanceof mongoose.Error.ValidationError){
        return res.status(400).json({error:error.message});
    }else{
        return res.status(500).json({error:error.message});
    }
}

module.exports = errorHandler;