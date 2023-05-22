import { NextFunction, Request, Response } from "express";

const errorHandler = (error:Error,req:Request,res:Response, next:NextFunction) =>{
    if(error.name === 'CastError'){
        res.status(400).json({error: 'malformatted id'});
    }
    else{
        res.status(500).json({error:error.message});
    }
    next();
}

module.exports = errorHandler;