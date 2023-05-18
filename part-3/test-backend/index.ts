import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";

const logger = (req:Request,res:Response,next:NextFunction) =>{
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---')
    next();
}

const unknownEndpoint = (req:Request, res:Response, next:NextFunction) =>{
    res.status(404).json({error:'unknown endpoint'});
    next();
}

const app:Express = express();
app.use(express.json());
app.use(cors());
app.use(logger);

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]


//Test page
app.get('/', (req:Request, res:Response) => {
  res.send('<h1>Hello world!</h1>');
});

//GET all notes
app.get('/api/notes',(req:Request,res:Response) =>{
  res.json(notes);
});

//GET note by id
app.get('/api/notes/:id',(req:Request,res:Response) =>{
  const id = Number(req.params.id);
  const note = notes.find((note)=>note.id === id);
  if(note === undefined){
    res.status(404).json({error:'note with given id not found'});
  }else{
    res.json(note);
  }
})

//DELETE note by id
app.delete('/api/notes/:id', (req:Request,res:Response) =>{
  const id = Number(req.params.id);
  notes = notes.filter((note)=>note.id !== id);
  res.status(204).end();
});

const generateId = () =>{
  const maxId = notes.length > 0 ? Math.max(...notes.map(note=>note.id)) : 0;
  return maxId + 1;
}

//POST new note
app.post('/api/notes', (req:Request, res:Response) =>{
  const body = req.body;

  if(!body.content){
    return res.status(400).json({error:'content is missing'});
  }

  const note = {
    content:body.content,
    important:body.important || false,
    id:generateId()
  }

  console.log(note);

  notes = notes.concat(note);

  return res.json(note);
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});