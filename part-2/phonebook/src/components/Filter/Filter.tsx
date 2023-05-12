import React, { FC, FormEventHandler } from 'react';


interface FilterProps {
  filter:string,
  handleFilterChange:FormEventHandler<HTMLInputElement>
}

const Filter: FC<FilterProps> = ({filter,handleFilterChange}) => (
  <div>
    <label>filter  </label>
    <input value={filter} onChange={handleFilterChange}/>
  </div>
);

export default Filter;
