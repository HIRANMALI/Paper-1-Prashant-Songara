import express from 'express'
import recipeController from '../controllers/recipeController.js'
import { verifyToken } from '../../../../middleware/verifyToken.js'

const router = express.Router()

router.post("/createRecipe", verifyToken, recipeController.createRecipe)
router.get("/getRecipe/:recipe_id", verifyToken, recipeController.getRecipe)
router.get("/getAllRecipe", recipeController.getAllRecipe)
router.post("/seedRecipies", recipeController.seedRecipies)
router.get("/filterRecipies", verifyToken, recipeController.filterRecipies)
router.get("/searchRecipe/:input", verifyToken, recipeController.searchRecipe)

export default router