import React, { FC } from 'react';
import CountriesListItem from '../countries-list-item/countries-list-item';
import { Country } from '../../services/countries-service';
import CountryDetails from '../country-details/country-details';


interface CountriesListProps {
  countries:Country[] | undefined;
  handleShowClick:(name:string)=>void;
}

const CountriesList: FC<CountriesListProps> = ({countries, handleShowClick}) => {
  if(countries === undefined){
    return(null);
  }else{

    // if(countries.length > 10){
    //   return(
    //     <div className='border border-gray-200 p-4 rounded bg-white'>
    //       <p className='text-lg'>Too many matches, specify another filter</p>
    //     </div>
    //   );
    // }

    return(
      <div className='border border-gray-200 p-4 rounded max-h-96 overflow-auto bg-white'>
        <table className='w-full'>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country:Country)=>
              <CountriesListItem key={country.ccn3} name={country.name.common} handleShowClick={()=>handleShowClick(country.name.common)}/>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CountriesList;
