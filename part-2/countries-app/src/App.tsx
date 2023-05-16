import React, { FormEventHandler, useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/search-bar/search-bar';
import CountriesList from './components/countries-list/countries-list';
import countriesService, { Country } from './services/countries-service';
import weatherService, { Weather } from './services/weather-service';
import CountryDetails from './components/country-details/country-details';

const App = () =>{

  const [countries,setCountries] = useState<Country[]>([]);
  const [filter,setFilter] = useState<string>('');
  const [currentCountry,setCurrentCountry] = useState<Country>();
  const [weather,setWeather] = useState<Weather>();
  const [searchResult,setSearchResult] = useState<Country[] | undefined>([]);

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

  useEffect(()=>{
    if(currentCountry === undefined){
      setWeather(undefined);
      return;
    }
    weatherService
      .getWeather(currentCountry.capital[0])
      .then((response)=>setWeather(response));
  },[])

  useEffect(()=>{

    const result = filter.length === 0 ? undefined : countries.filter((country:Country)=>country.name.common.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));

    if(result === undefined){
      setCurrentCountry(undefined);
      setSearchResult(undefined);
      return;
    }

    if(result.length === 1){
      setCurrentCountry(result[0]);
      setSearchResult(undefined);
    }else if(result.length > 1){
      setCurrentCountry(undefined);
      setSearchResult(result);
    }

  },[filter]);

  useEffect(()=>{
    if(currentCountry === undefined){
      return;
    }

    if(currentCountry.capital.length === 0){
      return;
    }

    weatherService
      .getWeather(currentCountry.capital[0])
      .then((response:Weather)=>setWeather(response));

  },[currentCountry])
  
  return (
    <div className='bg-gray-50 min-h-screen py-8 px-4'>
      <div className='w-full min-h-[calc(100%_-_4rem)] mx-auto max-w-3xl bg-white rounded border border-gray-200 shadow-sm'>
        <div className='border-b border-gray-200 p-4'>
          <h1 className='text-3xl font-semibold'>Contries App</h1>
        </div>
        <div className='p-4'>
          <SearchBar value={filter} handleFilterChange={handleFilterChange}/>
          <CountriesList countries={searchResult} handleShowClick={handleShowClick}/>
          <CountryDetails details={currentCountry} weather={weather}/>
        </div>
      </div>
    </div>
  );
}

export default App;
