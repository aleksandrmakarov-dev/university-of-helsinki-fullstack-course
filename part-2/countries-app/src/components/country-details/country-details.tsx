import React, { FC } from 'react';
import { Country } from '../../services/countries-service';


interface CountryDetailsProps {
  details:Country
}

const CountryDetails: FC<CountryDetailsProps> = ({details}) => {

  console.log(details);

  return(
    <div>
      <h2 className='text-2xl font-semibold mb-4'>{details.name.common}</h2>
      <p>
        <span className='mr-2'>Capital:</span>
        <span>{details.capital}</span>
      </p>
      <p>
        <span>Area:</span>
        <span className='mx-2'>{details.area}</span>
        <span>km²</span>
      </p>
      <h3 className='text-xl my-4'>Languages:</h3>
      <ul className='list-inside list-disc pl-4'>
        {
          Object.keys(details.languages).map((key)=>
            <li key={key}>
              {details.languages[key]}
            </li>
          )
        }
      </ul>
      <div className='mt-4'>
        <img className='w-64 h-auto mx-auto mb-4 border border-gray-200' src={details.flags.svg} alt={details.flags.alt}/>
        <p>{details.flags.alt}</p>
      </div>
    </div>
  )
}

export default CountryDetails;
