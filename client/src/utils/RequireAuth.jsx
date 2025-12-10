import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/authContext.jsx"

export const RequireAuth = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    
    if (loading) return <p>Loading....</p>
    
    if (!user) {
            window.alert("Please log-in first to access this route.")
            return <Navigate to="/" replace />
        }

    return children
}   