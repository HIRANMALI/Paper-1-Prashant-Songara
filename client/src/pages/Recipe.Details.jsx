import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import assets from "../assets/assets"
import Navbar from "../components/Navbar"

const RecipeDetails = () => {

  const [recipe, setRecipe] = useState([])
  const {recipe_id} = useParams()

  useEffect(() => {
    const getRecipe = async () => {
      const res = await axios.get(`http://localhost:5000/api/recipe/getRecipe/${recipe_id}`, {withCredentials: true})
      setRecipe(res.data.data)
    }

    getRecipe()
  }, [recipe_id])

  return (
    <>
    <Navbar />
    <div>
      <h2 className="mx-40 mt-10 text-4xl font-semibold">Recipe Details</h2>
      <div className="flex justify-between mx-40 mt-10">
        <div className="flex flex-col gap-2 shadow-lg px-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-4xl">{recipe.recipe_name}</h2>
            <h2 className="font-semibold text-2xl">{recipe.difficulty_level}</h2>
          </div>
          <p className="text-sm mt-2">Type: <span className="font-medium">{recipe.recipe_category}</span></p>
          <p className="text-sm">Estimated Time: <span className="font-medium">{recipe.cooking_time}m</span></p>
          <p className="text-sm">Ingredients: <span className="font-medium">{Array.isArray(recipe.ingredients) ? recipe.ingredients.join(" ") : "INGREDIENTS ARE LOADING..."}</span></p>
          <p className="text-sm">Instruction: <span className="font-medium">{recipe.cooking_instructions}</span></p>
        </div>
        <div>
          <img src={assets.dummyPhoto} alt="recipe_photo" className="max-w-lg" />
          
        </div>
      </div>

    </div>
    </>
  )
}

export default RecipeDetails