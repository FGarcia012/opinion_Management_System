import { Router } from "express";
import { addCategory, updateCategory, deleteCategory } from "./category.controller.js";
import { addCategoryValidator, deleteCategoryValidator, updateCategoryValidator } from "../middlewares/category-validators.js";

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Rutas de categorías
 */

/**
 * @swagger
 * /category/addCategory:
 *   post:
 *     summary: Agregar una nueva categoría
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       500:
 *         description: Error al agregar la categoría
 */

/**
 * @swagger
 * /category/updateCategory/{cid}:
 *   put:
 *     summary: Actualizar una categoría
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *       500:
 *         description: Error al actualizar la categoría
 */

/**
 * @swagger
 * /category/deleteCategory/{cid}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       500:
 *         description: Error al eliminar la categoría
 */

const router = Router();

router.post("/addCategory", addCategoryValidator, addCategory);

router.put("/updateCategory/:cid", updateCategoryValidator ,updateCategory);

router.delete("/deleteCategory/:cid",deleteCategoryValidator, deleteCategory);

export default router;