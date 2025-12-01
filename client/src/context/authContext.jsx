import {  useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    const login = async (formData) => {
        try {
            const loginData = {
                ...formData,
                deviceInfo: {
                    device_type: "web",
                    uuid: crypto.randomUUID(),
                    device_name: navigator.platform,
                }            
            }
            console.log(loginData);
            

            // const encryptedData = encryptData(finalData)

            const res = await axios.post('http://localhost:5000/api/auth/login', loginData, {withCredentials: true})

            console.log("Success:", res.data);
            window.alert(res.data.message)
            setUser(res.data.data)
            
            if (res.data.code === 200) {
                navigate("/", {replace: true}) 
            }
        } catch (err) {
            console.error(err);
            window.alert(err.response?.data?.message || "Something went wrong");
        }
    }

    const fetchUser = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/auth/me", {
            withCredentials: true  
            });

            console.log(res);
            return res.data.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    const fetchRecipe = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/recipe/getAllRecipe");
            console.log(res);
            return res.data.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    return (
        <AuthContext.Provider value={{user, setUser, login, fetchUser, fetchRecipe}}>
            {children}
        </AuthContext.Provider>
    )

}

