import { FormEvent, useState } from 'react';

const useField = <T,>(type: string, defaultValue: T, placeholder: string) => {
  const [value, setValue] = useState<T>(defaultValue);

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value as T);
  };

  const reset = () => {
    setValue(defaultValue);
  };

  return {
    value,
    onChange,
    type,
    reset,
    placeholder,
  };
};

export default useField;
