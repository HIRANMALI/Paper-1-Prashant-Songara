import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import RecipeCard from '../components/recipeCard'
import Footer from '../components/Footer'
import SearchBar from '../components/searchBar'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const AllRecipies = () => {
    const {allRecipies, navigate} = useContext(AuthContext)
    const {input} = useParams()
    const [result, setResult] = useState([])

    useEffect(() => {
        const searchRecipe = async () => {
            const res = await axios.get(`http://localhost:5000/api/recipe/searchRecipe/${input}`, {withCredentials: true})
            setResult(res.data.data)
        }
        searchRecipe()
    }, [input])

  return (
    <div>
        <Navbar />
        <div className='flex items-center justify-between mx-40 my-12'>
            <h2 className='text-4xl font-semibold cursor-pointer' onClick={() => navigate("/recipe-list")} >Recipe Lists</h2>
            <SearchBar data={input} />
        </div>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-36 px-16 md:gap-4 gap-4 mt-8 mb-5'>
            {result.length > 0 ? result.map((recipe, i) => (<RecipeCard key={i} recipe={recipe} />)) : allRecipies.map((recipe, i) =>
                ( 
                    <RecipeCard key={i} recipe={recipe} />
                ))}
        </div>
        <Footer />
    </div>
  )
}

export default AllRecipies