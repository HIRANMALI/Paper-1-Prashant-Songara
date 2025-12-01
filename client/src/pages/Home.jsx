import { useNavigate } from "react-router-dom"

import { useContext, useEffect } from "react"
import { AuthContext } from "../context/authContext"

const Home = () => {

  // const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const { user, setUser, fetchUser} = useContext(AuthContext)

  useEffect(() => {
    const loadUser = async () => {
      const loggedUser = await fetchUser()
      setUser(loggedUser)
    }

    loadUser()

  }, [])

  return (
    <div className="mt-2 ">
        <nav className='flex items-center justify-around text-xl font-semibold'>
            <h4 className="font-bold text-2xl">Recipe-App</h4>

            {user ? 
            <div className="flex items-center justify-center gap-4">
              <button className="rounded-lg bg-green-500 px-2 py-1" onClick={() => {navigate("/")}}>Fav Recipe</button> 
              {/* <button className="rounded-lg bg-slate-500 px-2 py-1" onClick={() => logout()}>Logout</button>  */}
            </div> :
            <div className="flex items-center justify-center gap-4">
              <button className="rounded-lg bg-yellow-500 px-2 py-1" onClick={() => navigate("/login")} >Login</button>
              <button className="rounded-lg bg-orange-600 px-2 py-1" onClick={() => navigate("/signup")} >Signup</button>
            </div>}
        </nav>

        <div className="flex flex-col items-baseline justify-center mt-20 mx-72 gap-8">
        
        </div>
    </div>
  )
}

export default Home