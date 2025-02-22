import { Router } from "express";
import { addCategory, updateCategory, deleteCategory } from "./category.controller.js";
import { addCategoryValidator, deleteCategoryValidator, updateCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

router.post("/addCategory", addCategoryValidator, addCategory);

router.put("/updateCategory/:cid", updateCategoryValidator ,updateCategory);

router.delete("/deleteCategory/:cid",deleteCategoryValidator, deleteCategory);

export default router;