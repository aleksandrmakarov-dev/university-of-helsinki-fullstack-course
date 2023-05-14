import React, { FormEventHandler, useEffect, useState } from 'react';
import phonebookService from './services/phonebook-service';
import AddNoteForm from './components/AddNoteForm/AddNoteForm';
import Filter from './components/Filter/Filter';
import NumberList from './components/NumberList/NumberList';

export interface IPerson{
  id:number,
  name:string,
  number:string
}

const App = () =>{

  const [persons, setPersons] = useState<IPerson[]>([])

  const [name,setName] = useState<string>('');
  const [phone,setPhone] = useState<string>('');
  const [filter,setFilter] = useState<string>('');

  useEffect(()=>{
    phonebookService
      .getAll()
      .then((response)=>{
        setPersons(response);
      })
  },[])

  const handleNameChange:FormEventHandler<HTMLInputElement> = (e) =>{
    setName(e.currentTarget.value);
  }

  const handlePhoneChange:FormEventHandler<HTMLInputElement> = (e) =>{
    setPhone(e.currentTarget.value);
  }

  const findPersonByName = (name:string):IPerson | undefined =>{
    const person = persons.find((person:IPerson) => person.name.toLocaleLowerCase() === name.toLocaleLowerCase());
    return person;
  }

  const handleFormSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
    e.preventDefault();

    if(name.length === 0 || phone.length === 0){
      alert('Both name and phone can\'t be empty!');
      return;
    }

    const existingPerson = findPersonByName(name);
    if(existingPerson !== undefined){

      const replace = window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`);
      if(replace){

        const updatePerson:IPerson = {...existingPerson, number:phone};

        phonebookService
          .update(existingPerson.id,updatePerson)
          .then((response:IPerson)=>{
            setPersons(persons.map((person:IPerson)=>person.id !== response.id ? person: response));
          })
      }
    }
    else{
      const personObject:IPerson = {
        id:0,
        name:name,
        number:phone
      }
  
      phonebookService
        .create(personObject)
        .then((response:IPerson)=>{
          setPersons(persons.concat(response));
  
          setName('');
          setPhone('');
        })
    }
  }

  const handleFilterChange:FormEventHandler<HTMLInputElement> = (e) =>{
    const value:string = e.currentTarget.value;
    if(value === filter){
      return;
    }

    setFilter(value);
  }

  const handlePersonRemove = (id:number) =>{

    const existingPerson = persons.find((person:IPerson)=>person.id === id);
    if(existingPerson === undefined){
      alert(`Person with id = ${id} does not exist`);
      return;
    }

    const remove = window.confirm(`Are you sure you want to delete ${existingPerson.name}`);
    if(remove){
      phonebookService
        .remove(existingPerson.id)
        .then((response)=>{
          setPersons(persons.filter((person:IPerson)=>person.id !== existingPerson.id));
        })
        .catch((error)=>{
          alert(`${existingPerson.name} is already removed from server`);
          setPersons(persons.filter((person:IPerson)=>person.id !== existingPerson.id));
        })
    }
  }

  const filteredPersons:IPerson[] = filter.length === 0 ? persons : persons.filter(
    (person:IPerson) =>
      person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

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
      <h2>Phone numbers</h2>
      <NumberList persons={filteredPersons} handlePersonRemove={handlePersonRemove}/>
    </div>
  );
}

export default App;
