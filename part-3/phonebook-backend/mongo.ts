import mongoose, { Schema } from 'mongoose';

interface IPerson{
  name: string;
  number: string;
}

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://ac5295:${password}@cluster0.jql0diz.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new Schema<IPerson>({
  name: String,
  number: String,
});

const Person = mongoose.model('Note', personSchema);

if (process.argv.length === 3) {
  Person
    .find()
    .then((response: IPerson[]) => {
      console.log('--- Phonebook ---');
      response.forEach((person: IPerson) => {
        console.log(`${person.name} ${person.number}`);
      });
      console.log('---------------');
    })
    .catch((e) => console.log(e))
    .finally(() => mongoose.connection.close());
} else {
  const person: IPerson = {
    name: process.argv[3],
    number: process.argv[4],
  };

  const personObject = new Person(person);
  personObject
    .save()
    .then((response) => {
      console.log(`added ${person.name} number ${person.number} to phonebook`);
    })
    .finally(() => mongoose.connection.close());
}

// Code to start app with typescript
// npx ts-node-dev mongo.ts -- password param1 param2
//
