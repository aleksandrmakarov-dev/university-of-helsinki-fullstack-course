import { FormEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { filterChange } from '../../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange: FormEventHandler<HTMLInputElement> = e => {
    dispatch(filterChange(e.currentTarget.value));
  };
  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
