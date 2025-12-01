import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sequelize  from './config/database.js';
import './models/DeviceInfo.js'
import './models/User.js'
import './models/Recipe.js'
import authRouter from './modules/v1/auth/routes/authRoutes.js'
import recipeRouter from './modules/v1/recipe/routes/recipeRoute.js'


import dotenv from 'dotenv';
dotenv.config();


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors( {
  origin: "http://localhost:5173",
  credentials: true
}))

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRouter )
app.use("/api/recipe", recipeRouter )


app.get("/", (req, res) => {
    res.send("Server is created using Express.js");
});

const runServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("database connected");

        await sequelize.sync({ alter: true });
        console.log("database synced");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("DB Error:", err);
    }
}

runServer()
