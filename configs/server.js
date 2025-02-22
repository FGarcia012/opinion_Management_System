"use strict"

import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import publicationRoutes from "../src/publication/publication.routes.js"
import categoryRoutes from "../src/category/category.routes.js"
import commentRoutes from "../src/comment/comment.routes.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import { createAdminUser } from "../src/utils/createAdminUser.js"
import { createDefaultCategory } from "../src/utils/createDefaultCategory.js"
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
    app.use("/managementOpinion/v1/user", userRoutes)
    app.use("/managementOpinion/v1/publication", publicationRoutes)
    app.use("/managementOpinion/v1/category", categoryRoutes)
    app.use("/managementOpinion/v1/comment", commentRoutes)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const conecetarDB = async () => {
    try {
        await dbConnection()
    } catch (err) {
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try {
        middlewares(app)
        conecetarDB()
        routes(app)
        createAdminUser()
        createDefaultCategory()
        const port = process.env.PORT || 3004
        app.listen(port, () => {
            console.log(`Server running on port ${port} matutina`)
        })
    } catch (err) {
        console.log(`Server initialization failed: ${err}`)
    }
}