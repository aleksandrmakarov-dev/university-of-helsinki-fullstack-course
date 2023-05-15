import React, { FormEventHandler, useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/search-bar/search-bar';
import CountriesList from './components/countries-list/countries-list';
import countriesService, { Country } from './services/countries-service';

const App = () =>{

  const [countries,setCountries] = useState<Country[]>([]);
  const [filter,setFilter] = useState<string>('');

  const sortCountriesByName = (a:Country,b:Country)=>{
    if (a.name.common < b.name.common) {
      return -1;
    }
    if (a.name.common > b.name.common) {
      return 1;
    }
    return 0;
  }

  const handleFilterChange:FormEventHandler<HTMLInputElement> = (e) =>{
    setFilter(e.currentTarget.value);
  }

  const handleShowClick = (name:string) =>{
    setFilter(name);
  }

  useEffect(()=>{
    countriesService
      .getAll()
      .then((response)=>{
        setCountries(response.sort(sortCountriesByName));
      })
  },[]);

  const searchResult = filter.length === 0 ? undefined : countries.filter((country:Country)=>country.name.common.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  
  return (
    <div className='bg-gray-50 min-h-screen py-8 px-4'>
      <div className='w-full min-h-[calc(100%_-_4rem)] mx-auto max-w-3xl bg-white rounded border border-gray-200 shadow-sm'>
        <div className='border-b border-gray-200 p-4'>
          <h1 className='text-3xl font-semibold'>Contries App</h1>
        </div>
        <div className='p-4'>
          <SearchBar value={filter} handleFilterChange={handleFilterChange}/>
          <CountriesList countries={searchResult} handleShowClick={handleShowClick}/>
        </div>
      </div>
    </div>
  );
}

export default App;
