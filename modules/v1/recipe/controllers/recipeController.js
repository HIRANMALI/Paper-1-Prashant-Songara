import recipeModule from "../modules/recipeModule.js"

const recipeController = {
    async createRecipe(req, res) {
        const recipeData = req.body
        const {user_id} = req.user

        if (recipeData && user_id) {
            return recipeModule.createRecipe(recipeData, user_id, res)
        } else {
            return res.status(404).json({code: 404, message: "RecipeData or user_id is not found.", data: []})
        }

    },

    async getAllRecipe(req, res) {
        const page = parseInt(req.query.page) || 1;     
        const limit = parseInt(req.query.limit) || 10; 
       
        return recipeModule.getAllRecipe(page, limit, res)
    },

    async getRecipe(req, res) {
        const {recipe_id} = req.params
        const {user_id} = req.user
        if (recipe_id && user_id) {
            return recipeModule.getRecipe(recipe_id, user_id, res)
        } else {
            return res.status(404).json({code: 404, message: "recipe_id or user_id not found.", data: []})
        }
    },
}

export default recipeController