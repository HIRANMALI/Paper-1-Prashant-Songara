import authModule from "../modules/authModule.js"

const authController = {
    async signup(req, res) {
        const {userData} = req.body
        if (userData) {
            return authModule.signup(userData, res)
        } else {
            return res.status(404).json({code: 404, message: "Data not found.", data: []})
        }
    },

    async login(req, res) {
        const loginData = req.body
        if (loginData) {
            return authModule.login(loginData, res)
        } else {
            return res.status(404).json({code: 404, message: "Data not found.", data: []})
        }
    },

    async logout(req, res) {

    },

    async me(req, res) {
        const {user_id} = req.user
        if (user_id) {
            return authModule.me(user_id, res)
        } else {
            return res.status(404).json({code: 404, message: "user_id not found.", data: []})
        }

    },
}

export default authController