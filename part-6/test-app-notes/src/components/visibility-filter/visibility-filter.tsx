import { useDispatch } from 'react-redux';
import { filterChange } from '../../reducers/filterReducer';
import { useAppDispatch } from '../../hooks';

const VisibilityFilter = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <input type="radio" name="filter" onChange={() => dispatch(filterChange('ALL'))} /> all
      <input type="radio" name="filter" onChange={() => dispatch(filterChange('IMPORTANT'))} /> important
      <input type="radio" name="filter" onChange={() => dispatch(filterChange('NOTIMPORTANT'))} /> not important
    </div>
  );
};

export default VisibilityFilter;
