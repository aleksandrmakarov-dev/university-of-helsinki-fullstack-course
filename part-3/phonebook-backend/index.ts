import express, {Express, Response, Request} from "express";

interface Person{
    id:number,
    name:string,
    number:string
}

let persons:Person[] = [
    { 
        id: 1,
        name: "Arto Hellas", 
        number: "040-123456"
    },
    { 
        id: 2,
        name: "Ada Lovelace", 
        number: "39-44-5323523"
    },
    { 
        id: 3,
        name: "Dan Abramov", 
        number: "12-43-234345"
    },
    { 
        id: 4,
        name: "Mary Poppendieck", 
        number: "39-23-6423122"
    }
]

const app:Express = express();

app.use(express.json());

const getPersonById = (id:number):Person | undefined =>{
    return persons.find((person:Person)=>person.id === id);
}

app.get('/', (req:Request, res:Response) =>{
    res.json({message:'hello world!'});
})

//GET all persons
app.get('/api/persons', (req:Request, res:Response) =>{
    res.json(persons);
})

//GET info about number of persons and current time
app.get('/api/info', (req:Request, res:Response) =>{
    const date = Date();
    res.end(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`);
});

//GET person by id
app.get('/api/persons/:id', (req:Request, res:Response) =>{
    const id = Number(req.params.id);
    const person = getPersonById(id);
    if(!person){
        res.status(404).json({error:`person wit id = ${id} not found`});
    }else{
        res.json(person);
    }
})

//DELETE person by id
app.delete('/api/persons/:id', (req:Request, res:Response) =>{
    const id = Number(req.params.id);
    const person = getPersonById(id);
    if(!person){
        res.status(404).json({error:`person wit id = ${id} not found`});
    }else{
        persons = persons.filter((person:Person) =>person.id !== id);
        res.status(204).end();
    }
});

//POST person
app.post('/api/persons', (req:Request, res:Response) =>{
    const body:Person = req.body;
    if(!body.name){
        return res.status(400).json({error:'name is missing'});
    }

    if(!body.number){
        return res.status(400).json({error:'number is missing'});
    }

    const existingPerson = persons.find((person:Person) =>person.name.toLocaleLowerCase() === body.name.toLocaleLowerCase());
    if(existingPerson !== undefined){
        return res.status(400).json({error:`person with name ${body.name} already exists`});
    }

    const newPerson:Person = {
        id:Math.round(Math.random()*1000000),
        name:body.name,
        number:body.number
    }

    persons = persons.concat(newPerson);
    return res.json(newPerson);
});


const PORT:number = 3000;

app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
})