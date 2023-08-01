import { FormEvent, useState } from 'react';

const useField = <T>(type: string, placeholder: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(defaultValue);

  const onChange = () => (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value as T);
    console.log(e.currentTarget.value);
  };

  const reset = () => setValue(defaultValue);

  return {
    type,
    placeholder,
    value,
    onChange,
    reset,
  };
};

export default useField;
