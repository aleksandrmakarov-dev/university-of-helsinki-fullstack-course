import axios from 'axios';
import { useEffect, useState } from 'react';
import { CountryResponse } from '../interfaces/CountryResponse';

const useCountry = (name: string) => {
  const [value, setValue] = useState<CountryResponse | null>(null);

  useEffect(() => {
    if (name.length === 0) {
      setValue(null);
    } else {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => {
          setValue({
            found: response.data !== null,
            data: response.data,
          });
        })
        .catch(() => {
          setValue({
            found: false,
            data: null,
          });
        });
    }
  }, [name]);

  return value;
};

export default useCountry;
