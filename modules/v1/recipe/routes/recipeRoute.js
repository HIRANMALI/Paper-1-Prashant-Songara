import express from 'express'
import recipeController from '../controllers/recipeController.js'
import { verifyToken } from '../../../../middleware/verifyToken.js'

const router = express.Router()

router.post("/createRecipe", verifyToken, recipeController.createRecipe)
router.get("/getRecipe/:recipe_id", verifyToken, recipeController.getRecipe)
router.get("/getAllRecipe", recipeController.getAllRecipe)

export default router