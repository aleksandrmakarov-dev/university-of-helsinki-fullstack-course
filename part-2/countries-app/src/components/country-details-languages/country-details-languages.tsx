import React, { FC } from 'react';


interface CountryDetailsLanguagesProps {
  languages:any
}

const CountryDetailsLanguages: FC<CountryDetailsLanguagesProps> = ({languages}) => {
  if(languages === undefined){
    return(null);
  }

  return(
    <>
      <h3 className='text-xl my-4'>Languages:</h3>
      <ul className='list-inside list-disc pl-4'>
          {
            Object.keys(languages).map((key)=>
              <li key={key}>
                {languages[key]}
            </li>
            )
          }
      </ul>
    </>
  )
}

export default CountryDetailsLanguages;
