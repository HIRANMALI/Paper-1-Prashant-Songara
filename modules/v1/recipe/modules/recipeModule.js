import { Op } from "sequelize";
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

            return res.status(200).json({ code: 200, message: "Recipies fetched successfully.", data: recipes.rows , totalItems: recipes.count,
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

            return res.status(200).json({code: 200, message: 'Recipe found successfully.', data: recipe})
            
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: "Internal server error",
                error: error.message
            });  
        }
    },

    async seedRecipies(recipies, res) {
        try {
            console.log("recipies seeding started")

            await Recipe.destroy({where: {}, truncate: true, restartIdentity: true})
            console.log("existing recipies destroyed")

            await Recipe.bulkCreate(recipies)
            console.log("recipies created successfully.")
            
            res.status(201).json({code: 201, message: "Recipies created successfully.", data: []})
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: "Internal server error",
                error: error.message
            });  
        }
    },

    async filterRecipies(filterOptions, res) {
        try {
            const {category, time, page = 1, limit = 10 } = filterOptions
            const offset = (page - 1) * limit

            const where = {
            }

            if (category ) {
                where.recipe_category = category
                where.cooking_time = {[Op.lte]: time}
            }

            const result = await Recipe.findAll({where, limit: Number(limit), offset: Number(offset), order:[["createdAt", "DESC"]] })

            res.status(200).json({code: 200, message: "Filter applied successfully.", data: result})
            
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: "Internal server error",
                error: error.message
            }); 
        }
    },

    async searchRecipe(input, res) {
        try {
            const result = await Recipe.findAll({where : {recipe_name: {[Op.iLike]: `%${input}%`}} })

            res.status(200).json({code: 200, message: "search applied successfully.", data: result})
            
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: "Internal server error",
                error: error.message
            }); 
        }
    }
}

export default recipeModule