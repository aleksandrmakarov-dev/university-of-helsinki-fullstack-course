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
  const [searchModeExact,setSearchModeExact] = useState<boolean>(false);

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
    setSearchModeExact(false);
  }

  const handleShowClick = (name:string) =>{
    setFilter(name);
    setSearchModeExact(true);
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

    if(currentCountry.capital === undefined){
      setWeather(undefined);
      return;
    }

    if(currentCountry.capital.length === 0){
      setWeather(undefined);
      return;
    }

    weatherService
      .getWeather(currentCountry.capital[0])
      .then((response)=>setWeather(response));
  },[currentCountry])

  useEffect(()=>{

    let result:Country[] | undefined = undefined;

    if(filter.length !== 0){

      const filterFunc = searchModeExact ? (name:string,filter:string) => name === filter : (name:string,filter:string) => name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());

      result = countries.filter((country:Country)=>filterFunc(country.name.common,filter));
    }

    if(result === undefined){
      setCurrentCountry(undefined);
      setSearchResult(undefined);
      return;
    }

    if(result.length === 1){
      setCurrentCountry(result[0]);
      setSearchResult(undefined);
    }else if(result.length !== 1){
      setCurrentCountry(undefined);
      setSearchResult(result);
    }

  },[filter]);

  useEffect(()=>{
    if(currentCountry === undefined){
      return;
    }

    if(currentCountry.capital === undefined || currentCountry.capital.length === 0){
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
          <h1 className='text-3xl font-semibold'>Countries App</h1>
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
