import { FC, FormEvent } from 'react';
import useField from '../hooks/useField';
import PersonData from '../interfaces/PersonData';

interface PersonFormProps {
  onCreate: (person: PersonData) => Promise<PersonData>;
}

const PersonForm: FC<PersonFormProps> = ({ onCreate }) => {
  const { reset: resetName, ...nameInput } = useField<string>('text', '');
  const { reset: resetNumber, ...numberInput } = useField<string>('text', '');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await onCreate({ id: 0, name: nameInput.value, number: numberInput.value });

    resetName();
    resetNumber();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          Name: <input {...nameInput} />
        </div>
        <div>
          Number: <input {...numberInput} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default PersonForm;
