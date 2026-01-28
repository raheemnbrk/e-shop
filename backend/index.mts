import dotenv from "dotenv"
dotenv.config()

import express from "express"
import { connectDB } from "./configs/dbConfig.mts"
import userRouter from "./routes/userRoutes.mts"
import connectCloudinary from "./configs/cloudinaryConfig.mts"

const app = express()
app.use(express.json())

await connectDB()
connectCloudinary()

app.use('/api/users' , userRouter)

app.get("/" , (req , res)=>{
    console.log("hello world")
})

const port = process.env.PORT || 3000

app.listen(port , ()=>{
    console.log(`server is running on port ${port}`)
})
