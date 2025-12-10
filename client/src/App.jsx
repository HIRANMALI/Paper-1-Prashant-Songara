import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import RecipeDetails from "./pages/Recipe.Details"
import { RequireAuth } from "./utils/RequireAuth"
import AllRecipies from "./pages/AllRecipies"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipe-list" element={<RequireAuth><AllRecipies /></RequireAuth>} />
        <Route path="/recipe-list/:input" element={<RequireAuth><AllRecipies /></RequireAuth>} />
        <Route path="/recipe/:recipe_id" element={<RequireAuth><RecipeDetails /></RequireAuth>} />
      </Routes>
    </>
  )
}

export default App
