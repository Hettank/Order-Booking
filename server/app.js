import express from "express"
import { connectDB } from "./config/db.js"
import router from "./routes/index.js"

import cors from "cors"

import "./associations.js"

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use("/api", router)

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Listening to port ${PORT}`)
        })
    } catch (error) {
        console.log("Error connecting")
    }
}

startServer()