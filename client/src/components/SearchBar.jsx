import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'

const SearchBar = ({data}) => {
    const navigate = useNavigate()
    const [input, setInput] = useState(data ? data : '')

    const searchHandler = (e) => {
        e.preventDefault()
        navigate('/recipe-list/' + input)
    }

  return (
    <form onSubmit={searchHandler} className='max-w-xl w-full border border-gray-500 md:h-14 h-12 flex items-center bg-white rounded'>
        <img src={assets.searchIcon} alt="search_logo" className='md:w-15 w-10 px-3' />
        <input onChange={e => setInput(e.target.value)} type="text" value={input} placeholder='Enter Recipe name' className='w-full h-full outline-none ' />
        <button type='submit' className='border bg-blue-500 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1 font-semibold'>Search</button>
    </form>
  )
}

export default SearchBar