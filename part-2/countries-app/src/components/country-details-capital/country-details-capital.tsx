import React, { FC } from 'react';


interface CountryDetailsCapitalProps {
  capital:string[]
}

const CountryDetailsCapital: FC<CountryDetailsCapitalProps> = ({capital}) => {
  if(capital === undefined || capital.length === 0){
    return(null);
  }

  return(
    <p>
      <span className='mr-2'>Capital:</span>
      <span>{capital.join(', ')}</span>
    </p>
  )
}

export default CountryDetailsCapital;
