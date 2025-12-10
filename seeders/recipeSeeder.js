import Recipe from "../models/Recipe.js"
import recipe from "./recipe.json" assert {type: "json"}

const seedRecipe = async () => {
    try {
        console.log("Recipies seeding started")

        await Recipe.destroy({where: {}, truncate: true})
        console.log("All existing recipies deleted.");
        
        await Recipe.bulkCreate(recipe)
        console.log("New recipies added successfully.");
        
    } catch (error) {
        console.error("Error seeding Recipies: ", error);
    }
}