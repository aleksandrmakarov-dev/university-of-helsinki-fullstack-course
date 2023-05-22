import express, {Express, Response, Request, NextFunction} from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import { Model } from "mongoose";
import { IPerson } from "./models/person";

dotenv.config();

const app:Express = express();
const Person:Model<IPerson> = require('./models/person');
const errorHandler = require('./middlewares/errorHandler');

//Define token for body
morgan.token('body',(req:Request) => JSON.stringify(req.body));

app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('build'));

//GET all persons
app.get('/api/persons', (req:Request, res:Response,next:NextFunction) =>{
    Person
        .find()
        .then((response:IPerson[]) =>{
            return res.json(response);
        })
        .catch((e) =>next(e))
})

//GET info about number of persons and current time
app.get('/info', (req:Request, res:Response,next:NextFunction) =>{
    Person
        .find()
        .then((response:IPerson[]) =>{
            const date = Date();
            return res.end(`<p>Phonebook has info for ${response.length} people</p><p>${date}</p>`);
        })
        .catch((e) =>next(e))
});

//GET person by id
app.get('/api/persons/:id', (req:Request, res:Response,next:NextFunction) =>{
    const id = req.params.id;
    Person
        .findById(id)
        .then((response:IPerson | null) =>{
            if(response === null){
                return res.status(404).json({error:`person with id = ${id} not found`});
            }else{
                return res.json(response);
            }
        })
        .catch((e) =>next(e))
})

//DELETE person by id
app.delete('/api/persons/:id', (req:Request, res:Response,next:NextFunction) =>{
    const id = req.params.id;
    Person
        .findByIdAndDelete(id)
        .then((response:IPerson | null) =>{
            if(response === null){
                return res.status(404).json({error:`person wit id = ${id} not found`});
            }else{
                return res.status(204).end();
            }
        })
        .catch((e) =>next(e))
});

//POST person
app.post('/api/persons', (req:Request, res:Response,next:NextFunction) =>{
    const body:IPerson = req.body;
    //Check if person with given name already exists

    Person
        .findOne({name:{$regex:`/${body.name}/i`}})
        .then((response:IPerson | null) =>{
            //If response is not null, then return error that person with given name exists
            if(response !== null){
                return res.status(400).json({error:`person with name ${body.name} already exists`});
            }else{
                //Else create new person and add to database
                const newPerson:IPerson = {
                    id:'',
                    name:body.name,
                    number:body.number
                }
                Person
                    .create(newPerson)
                    .then((createResponse:IPerson) =>{
                        return res.json(createResponse);
                    })
                    .catch((e) =>next(e))
            }
        })
        .catch((e) =>next(e))
});

//PUT person by id
app.put('/api/persons/:id', (req:Request, res:Response,next:NextFunction) =>{
    const id = req.params.id;

    const body:IPerson = req.body;

    Person
        .findByIdAndUpdate(
            id,
            {name:body.name,number:body.number},
            {new:true,runValidators:true,context:'query'}
        )
        .then((response:IPerson | null) =>{
            if(response === null){
                return res.status(404).json({error:`person wit id = ${id} not found`});
            }else{
                return res.json(response);
            }
        })
        .catch((e) =>next(e));
})

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
})