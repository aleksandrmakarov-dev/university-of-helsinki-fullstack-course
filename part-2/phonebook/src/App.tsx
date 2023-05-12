import React, { FormEventHandler, useState } from 'react';
import Filter from './components/Filter/Filter';
import AddNoteForm from './components/AddNoteForm/AddNoteForm';
import NumberList from './components/NumberList/NumberList';

export interface IPerson{
  id:number,
  name:string,
  number:string
}

const App = () =>{

  const [persons, setPersons] = useState<IPerson[]>([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [name,setName] = useState<string>('');
  const [phone,setPhone] = useState<string>('');
  const [filter,setFilter] = useState<string>('');

  const handleNameChange:FormEventHandler<HTMLInputElement> = (e) =>{
    setName(e.currentTarget.value);
  }

  const handlePhoneChange:FormEventHandler<HTMLInputElement> = (e) =>{
    setPhone(e.currentTarget.value);
  }

  const checkIfNameExists = (name:string):boolean =>{
    const person = persons.find((person:IPerson) => person.name.toLocaleLowerCase() === name.toLocaleLowerCase());
    return person !== undefined;
  }

  const handleFormSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
    e.preventDefault();

    if(checkIfNameExists(name)){
      alert(`${name} is already added to phonebook`);
      return;
    }

    const personObject:IPerson = {
      id:persons.length + 1,
      name:name,
      number:phone
    }

    setPersons(persons.concat(personObject));

    setName('');
    setPhone('');
  }

  const handleFilterChange:FormEventHandler<HTMLInputElement> = (e) =>{
    const value:string = e.currentTarget.value;
    if(value === filter){
      return;
    }

    setFilter(value);
  }

  const filteredPersons:IPerson[] =  persons.filter((person:IPerson) =>person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));

  return(
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add new person</h2>
      <AddNoteForm 
        name={name} 
        phone={phone} 
        handleFormSubmit={handleFormSubmit} 
        handleNameChange={handleNameChange} 
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <NumberList persons={filteredPersons}/>
    </div>
  );
}

export default App;
