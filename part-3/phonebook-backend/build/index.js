"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
let persons = [
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
];
const app = (0, express_1.default)();
//Define token for body
morgan_1.default.token('body', (req) => JSON.stringify(req.body));
app.use(express_1.default.json());
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms :body'));
const getPersonById = (id) => {
    return persons.find((person) => person.id === id);
};
app.get('/', (req, res) => {
    res.json({ message: 'hello world!' });
});
//GET all persons
app.get('/api/persons', (req, res) => {
    res.json(persons);
});
//GET info about number of persons and current time
app.get('/info', (req, res) => {
    const date = Date();
    res.end(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`);
});
//GET person by id
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = getPersonById(id);
    if (!person) {
        res.status(404).json({ error: `person wit id = ${id} not found` });
    }
    else {
        res.json(person);
    }
});
//DELETE person by id
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = getPersonById(id);
    if (!person) {
        res.status(404).json({ error: `person wit id = ${id} not found` });
    }
    else {
        persons = persons.filter((person) => person.id !== id);
        res.status(204).end();
    }
});
//POST person
app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name) {
        return res.status(400).json({ error: 'name is missing' });
    }
    if (!body.number) {
        return res.status(400).json({ error: 'number is missing' });
    }
    const existingPerson = persons.find((person) => person.name.toLocaleLowerCase() === body.name.toLocaleLowerCase());
    if (existingPerson !== undefined) {
        return res.status(400).json({ error: `person with name ${body.name} already exists` });
    }
    const newPerson = {
        id: Math.round(Math.random() * 1000000),
        name: body.name,
        number: body.number
    };
    persons = persons.concat(newPerson);
    return res.json(newPerson);
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
