import React from 'react';
import './index.scss';
import {GrFormClose} from 'react-icons/gr'

export default function SearchUsers({setIsSearch,setSearchInput}) { 
  return (
    <div className='search-users'>
    <input 
    placeholder='search . . .' 
    onChange={(event)=>setSearchInput(event.target.value)}
    />
    <GrFormClose className='close-icon' size={25} onClick={()=>{setIsSearch(false);setSearchInput("");}}/>
    </div>
  );
}
