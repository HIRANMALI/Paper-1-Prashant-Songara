import {useContext} from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const { user} = useContext(AuthContext)
    
  return (
    <nav className='flex items-center justify-around text-xl font-semibold py-4 bg-gray-500'>
            <h4 className="font-bold text-2xl text-white cursor-pointer" onClick={() => navigate("/")}>Recipe-App</h4>

            {user ? 
            <div className="flex items-center justify-center gap-4">
              <button className="rounded-lg bg-green-500 px-4 py-2 text-white text-base " onClick={() => {navigate("/")}}>Fav Recipe</button> 
              <button className="rounded-lg bg-white px-4 py-2 text-base" onClick={() => window.alert("This button is under constuction.")}>Logout</button> 
            </div> :
            <div className="flex items-center justify-center gap-4">
              <button className="rounded-lg bg-yellow-500 px-2 py-1" onClick={() => navigate("/login")} >Login</button>
              <button className="rounded-lg bg-orange-600 px-2 py-1" onClick={() => navigate("/signup")} >Signup</button>
            </div>}
    </nav>
  )
}

export default Navbar