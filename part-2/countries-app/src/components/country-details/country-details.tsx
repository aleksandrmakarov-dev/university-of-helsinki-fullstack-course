import React, { FC } from 'react';
import { Country } from '../../services/countries-service';
import { Weather } from '../../services/weather-service';
import WeatherDetails from '../weather-details/weather-details';
import CountryDetailsCapital from '../country-details-capital/country-details-capital';
import CountryDetailsLanguages from '../country-details-languages/country-details-languages';


interface CountryDetailsProps {
  details:Country | undefined;
  weather:Weather | undefined;
}

const CountryDetails: FC<CountryDetailsProps> = ({details,weather}) => {

  if(details === undefined){
    return(null);
  }

  return(
    <div>
      <h2 className='text-2xl font-semibold mb-4 pb-2 border-b border-gray-200'>{details.name.common}</h2>
      <CountryDetailsCapital capital={details.capital}/>
      <p>
        <span>Area:</span>
        <span className='mx-2'>{details.area}</span>
        <span>km²</span>
      </p>
      <CountryDetailsLanguages languages={details.languages}/>
      <div className='my-4'>
        <img className='w-64 h-auto mx-auto mb-4 border border-gray-200' src={details.flags.svg} alt={details.flags.alt}/>
        <p>{details.flags.alt}</p>
      </div>
      <WeatherDetails weather={weather}/>
    </div>
  )
}

export default CountryDetails;
