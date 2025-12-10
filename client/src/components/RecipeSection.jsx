import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import RecipeCard from './recipeCard'

const RecipeSection = () => {

    const navigate = useNavigate()
    const {allRecipies} = useContext(AuthContext)

    return (
        <div className='flex flex-col items-center justify-center mx-10 mt-24 mb-10'>
            <div className='flex items-center justify-center mb-10 gap-10 mx-10'>
                    {allRecipies.slice(0, 4).map((recipe, i) => 
                        <RecipeCard key={i} recipe={recipe} />
                    )
                    }
            </div>
                <button className='bg-white border border-black px-3 py-1 text-black' onClick={() => navigate("/recipe-list")}>Show all Recipies</button>
        </div>
    )
}

export default RecipeSection