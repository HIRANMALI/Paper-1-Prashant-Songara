import { generateRefreshToken } from "../../../../middleware/verifyToken.js"
import deviceinfo from "../../../../models/DeviceInfo.js"
import User from "../../../../models/user.js"

const authModule = {
    async signup(req, res) {
        try {
            const userData = req

            if (!userData.username && !userData.email && !userData.password ) {
                return res.status(400).json({code: 400, message: "Username, Email and Password are required", data: []})
            }

            const existingUser = await User.findOne({where: {email: userData.email}})
            if (existingUser) return res.status(409).json({code: 409, message: "Email already registered.", data: []})
    
            const user = await User.create(userData)
            if (!user) return res.status(400).json({code: 400, message: "Error creating User", data: []})
            
            return res.status(201).json({code: 201, message: "User created successfully.", data: [user]})
            
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: "Internal server error",
                error: error.message
            });
        }
    },

    async login(req, res) {
        try {
            const  {deviceInfo : clientDeviceInfo, ...loginData} = req
            
            if (!loginData.email && !loginData.password) {
                return res.status(400).json({code: 400, message: "Email and Password are required.", data: []})
            }

            const existingUser = await User.findOne({where: {email : loginData.email}})
            if (!existingUser) return res.status(404).json({code: 404, message: "Email does not found.", data: []})

            const passwordMatch = await existingUser.comparePassword(loginData.password)
            if (!passwordMatch) return res.status(401).json({code: 401, message: "Password is incorrect.", data: []})

            const token = generateRefreshToken({user_id: existingUser.id.toString()})
            
            await deviceinfo.create({ user_id: existingUser.id, ...clientDeviceInfo, device_token: token });
            // deviceInfo.save()

            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
                maxAge: 1000 * 60 * 60 * 5
            });

            return res.status(200).json({code: 200, message: "User logged-in successfully.", data: [existingUser]})
            
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: "Internal server error",
                error: error.message
            });
        }
    },

    async logout(req, res) {
        try {

            
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: "Internal server error",
                error: error.message
            });
        }
    },

    async me(req, res) {
        try {
            const user_id = req
    
            const user = await User.findOne({where: {id: user_id}})
            if (!user) return res.status(404).json({code: 404, message: "User not found.", data: []})
    
            return res.status(200).json({code: 200, message: "User found successfully.", data: [user]})
        } catch (error) {
             return res.status(500).json({
                code: 500,
                message: "Internal server error",
                error: error.message
            });
        }

    },
}

export default authModule