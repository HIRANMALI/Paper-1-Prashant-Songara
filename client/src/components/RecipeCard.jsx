import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
    const navigate = useNavigate()

    return (
            <div className="cursor-pointer border rounded-lg overflow-hidden shadow-sm bg-white w-full" onClick={() => navigate("/recipe/" + recipe.id)}>
                <img src={assets.dummyPhoto} alt="recipe image" className="w-full h-48 object-cover" />

                <div className="p-4">
                    <h2 className="text-lg font-bold truncate">
                        {recipe.recipe_name}
                    </h2>

                    <div className="flex items-center justify-between text-sm mt-2">
                        <p><span className="font-medium">Category:</span> <span>{recipe.recipe_category}</span></p>
                        <p><span className="font-medium">Time:</span> <span>{recipe.cooking_time}m</span> </p>
                    </div>

                    <p className="text-sm mt-2 line-clamp-2">
                        <span className="font-medium">Ingredients:</span>
                        {recipe.ingredients.map((ingre, i) => (
                            <span key={i}> {ingre}</span>
                        ))}
                    </p>
                </div>
            </div>
    )
}

export default RecipeCard
