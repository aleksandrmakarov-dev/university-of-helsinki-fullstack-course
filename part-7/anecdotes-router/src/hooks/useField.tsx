import { FormEvent, FormEventHandler, useState } from 'react';

const useField = (type: string) => {
  const [value, setValue] = useState<string>('');

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export default useField;
