import Recipe from "../../../../models/Recipe.js";
import User from "../../../../models/User.js";

const recipeModule = {
    async createRecipe(req, user_id,  res) {
       try {
            const recipeData = req

            const existingUser = await User.findOne({where: {id: user_id}})
            if (!existingUser) return res.status(404).json({code: 404, message: "Logged-in user not present in database.", data: []})

            const newRecipe = await Recipe.create({
                ...recipeData,
                user_id
            })

            return res.status(201).json({code: 201, message: "Recipe created successfully.", data: [newRecipe]})
         
       } catch (error) {
            return res.status(500).json({
                code: 500,
                message: "Internal server error",
                error: error.message
            });
       }

    },

    async getAllRecipe(page, limit, res) {
        try {
            const offset = (page - 1) * limit

            const recipes = await Recipe.findAndCountAll({limit, offset, order: [["createdAt", "DESC"]]})

            return res.status(200).json({ code: 200, message: "Recipies fetched successfully.", data: [recipes.rows] , totalItems: recipes.count,
                totalPages: Math.ceil(recipes.count / limit),
            })
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: "Internal server error",
                error: error.message
            });
        }
    },

    async getRecipe(recipe_id, user_id, res) {
        try {
            const user = await User.findOne({where: {id: user_id}})
            
            if (!user) return res.status(404).json({code: 404, message: "Logged-in user is not present in database.", data: []})

            const recipe = await Recipe.findOne({where: {id: recipe_id}})
            if (!recipe) return res.status(404).json({code: 404, message: "Recipe is not found.", data: []})

            return res.status(200).json({code: 200, message: 'Recipe found successfully.', data: [recipe]})
            
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: "Internal server error",
                error: error.message
            });  
        }
    },
}

export default recipeModule