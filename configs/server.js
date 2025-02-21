"use strict"

import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import { swaggerDocs, swaggerUi } from "../configs/swagger.js"

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/managementOpinion/v1/auth", authRoutes)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const conecetarDB = async () => {
    try{
        await dbConnection()
    } catch (err) {
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    } 
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conecetarDB()
        routes(app)
        const port = process.env.PORT || 3004
        app.listen(port, () => {
            console.log(`Server running on port ${port} matutina`)
        })
    } catch (err) {
        console.log(`Server initialization failed: ${err}`)
    }
}