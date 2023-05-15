import React, { FC, FormEventHandler } from 'react';


interface SearchBarProps {
  value:string;
  handleFilterChange:FormEventHandler<HTMLInputElement>
}

const SearchBar: FC<SearchBarProps> = ({value,handleFilterChange}) => (
  <div className='mb-4'>
    <label className='text-lg block mb-2'>Search countries</label>
    <input 
      className='w-full border border-gray-200 p-2 text-lg text-gray-600 rounded transition-colors outline-none hover:border-blue-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-200' 
      value={value}  
      onChange={handleFilterChange}
    />
  </div>
);

export default SearchBar;
