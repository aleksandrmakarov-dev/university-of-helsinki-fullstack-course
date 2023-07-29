import { FC } from 'react';
import { CountryResponse } from '../interfaces/CountryResponse';

interface CountryProps {
  country: CountryResponse | null;
}

const Country: FC<CountryProps> = ({ country }) => {
  if (country === null) {
    return null;
  }

  if (!country.found) {
    return <div>Country not found...</div>;
  }

  return (
    <div>
      <h3>{country.data?.name.common} </h3>
      <div>Capital: {country.data?.capital[0]} </div>
      <div>Population: {country.data?.population}</div>
      <img src={country.data?.flags.svg} height="100" alt={`flag of ${country.data?.name.common}`} />
    </div>
  );
};

export default Country;
