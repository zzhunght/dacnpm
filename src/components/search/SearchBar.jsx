import React from 'react'
import {CgSearch} from 'react-icons/cg'
import './style.css'
function SearchBar() {
  return (
    <div className='search-box'>
        <input className='search-input' type="text" />
        <CgSearch className='search-icon' />
    </div>
  )
}

export default SearchBar