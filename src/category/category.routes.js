import { Router } from "express"
import { addCategory } from "./category.controller.js"
import { addCategoryValidator } from "../middlewares/category-validators.js"

const router = Router()

router.post("/addCategory",addCategoryValidator, addCategory)

export default router