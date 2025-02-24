import React from 'react';
import { MdOutlineSearch } from "react-icons/md";

const SearchInput = ({value, handleChange, className}) => {
  return (
    <div className={`flex-row-between border rounded-md border-gray-400 p-1 ${className}`}>
        <input type='search' value={value} onChange={handleChange} placeholder='Search...' className='border-none outline-0 flex-1 px-1'/>
        <MdOutlineSearch size={22} color='gray'/>
    </div>
  )
}

export default SearchInput