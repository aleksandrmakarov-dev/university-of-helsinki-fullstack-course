import { FormEvent, useState } from 'react';

const useField = (type: string) => {
  const [value, setValue] = useState<string>('');

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return {
    value,
    onChange,
    type,
  };
};

export default useField;
