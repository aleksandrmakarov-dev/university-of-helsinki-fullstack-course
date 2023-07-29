import { FormEvent, useState } from 'react';
import './App.css';
import useField from './hooks/useField';
import useCountry from './hooks/useCountry';
import Country from './components/Country';

const App = () => {
  const nameInput = useField('');
  const [name, setName] = useState<string>('');
  const country = useCountry(name);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          Country Name: <input {...nameInput} />
          <button type="submit">Find</button>
        </div>
      </form>
      <Country country={country} />
    </div>
  );
};

export default App;
