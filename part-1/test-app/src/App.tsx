import React, { useEffect, useState } from 'react';
import './App.css';
import { click } from '@testing-library/user-event/dist/click';
import axios from 'axios';

const App = () => {

  const [countries,setCountries] = useState<any>([]);
  const [filteredCountries, setFilteredCountries] = useState<any>([]);
  const [filter,setFilter] = useState<string>('');

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response =>{
        setCountries(response.data);
        setFilteredCountries(response.data);
        return response
      })
      .then(response =>{
        console.log('then:',countries);
      }
      )
  },[])

  useEffect(() =>{
    if(filter.length === 0){
      setFilteredCountries(countries);
    }else{
      const filtered = countries.filter((c:any)=>c.name.common.toLowerCase().includes(filter.toLowerCase()));
      setFilteredCountries(filtered);
    }
  },[filter])

  useEffect(() =>{
    console.log(countries);
  },[countries])


  return (
    <div>
      <div>
        <label>filter: </label>
        <input value={filter} onChange={(e:any) => setFilter(e.target.value)}/>
      </div>
      <ul>
        {
          filteredCountries.map((c:any) =>
          <li key={c.cca2}>
            {c.name.common}
          </li>)
        }
      </ul>
    </div>
  )
}

export default App;