import express, { Express, NextFunction, Request, Response, response } from "express";
import cors from "cors";
import mongoose, { Model } from "mongoose";
import { INote } from "./models/note";
import * as dotenv from "dotenv";

dotenv.config();

const logger = (req:Request,res:Response,next:NextFunction) =>{
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---')
    next();
}

const app:Express = express();

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(logger);

const errorHandler = require('./middlewares/errorHandler');

const Note:Model<INote> = require('./models/note');

//GET all notes
app.get('/api/notes',(req:Request,res:Response,next:NextFunction) =>{
  Note
    .find()
    .then((response:INote[]) =>{
      return res.json(response);
    })
    .catch((e) => next(e));
});

//GET note by id
app.get('/api/notes/:id',(req:Request,res:Response,next:NextFunction) =>{
  const id = req.params.id;
  Note
    .findById(id)
    .then((response:INote | null)=>{
      if(response === null){
        return res.status(404).json({error:'note with given id not found'});
      }else{
        return res.json(response);
      }
    })
    .catch((e) =>next(e));
  
})

//DELETE note by id
app.delete('/api/notes/:id', (req:Request,res:Response,next:NextFunction) =>{
  const id = new mongoose.mongo.ObjectId(req.params.id);
  Note
    .deleteOne({_id:id})
    .then(()=>{
      return res.status(204).end();
    })
    .catch((e) =>next(e));
});

//POST new note
app.post('/api/notes', (req:Request, res:Response,next:NextFunction) =>{
  const body = req.body;

  if(!body.content){
    return res.status(400).json({error:'content is missing'});
  }else{
    
  }

  const note:INote = {
    id:'',
    content:body.content,
    important:body.important || false
  }

  console.log(note);



  Note
    .create(note)
    .then((response:INote) =>{
      return res.json(response);
    })
    .catch((e) =>next(e));
});

app.put('/api/notes/:id', (req:Request, res:Response, next:NextFunction) =>{
  const id = req.params.id;
  const body:INote = req.body;
  Note
    .findByIdAndUpdate(id,{
      content:body.content,
      important:body.important
    },{new:true,runValidators:true,context:'query'})
    .then((response:INote | null) =>{
      if(response === null){
        return res.status(404).json({error:`note wit id = ${id} not found`});
      }else{
        return res.json(response);
      }
    })
    .catch((e)=>next(e))
})

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});