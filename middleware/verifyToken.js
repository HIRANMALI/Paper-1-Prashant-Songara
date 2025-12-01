import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.auth_token
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET )

        req.user = { user_id : decoded.user_id}
        next()
    } catch (error) {
        return res.status(401).json({code: 401, message: "Invalid or Expired token", error: error.message})
    }
}

export const generateRefreshToken = (data) => {
    return jwt.sign(data, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE || "7d"
    })
}