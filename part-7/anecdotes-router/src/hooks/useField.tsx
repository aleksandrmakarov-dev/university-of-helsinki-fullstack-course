import { FormEvent, useState } from 'react';

const useField = (type: string) => {
  const [value, setValue] = useState<string>('');

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

export default useField;
