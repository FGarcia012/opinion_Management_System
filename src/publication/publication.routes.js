import { Router } from "express";
import { addPublication, deletePublication, getPublication, updatePublication } from "./publication.controller.js";
import { addPublicationValidator, updatePublicationValidator, deletePublicationValidator } from "../middlewares/publication-validators.js";

/**
 * @swagger
 * tags:
 *   name: Publications
 *   description: Rutas de publicaciones
 */

/**
 * @swagger
 * /publication/addPublication:
 *   post:
 *     summary: Agregar una nueva publicación
 *     tags: [Publications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               autor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publicación agregada exitosamente
 *       500:
 *         description: Error al agregar la publicación
 */

/**
 * @swagger
 * /publication/getPublication:
 *   get:
 *     summary: Obtener todas las publicaciones
 *     tags: [Publications]
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 *       500:
 *         description: Error al obtener las publicaciones
 */

/**
 * @swagger
 * /publication/updatePublication/{pid}:
 *   put:
 *     summary: Actualizar una publicación
 *     tags: [Publications]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la publicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               categoria:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               autor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publicación actualizada exitosamente
 *       500:
 *         description: Error al actualizar la publicación
 */

/**
 * @swagger
 * /publication/deletePublication/{pid}:
 *   delete:
 *     summary: Eliminar una publicación
 *     tags: [Publications]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Publicación eliminada exitosamente
 *       500:
 *         description: Error al eliminar la publicación
 */

const router = Router();

router.post("/addPublication", addPublicationValidator, addPublication);

router.get("/getPublication", getPublication);

router.put("/updatePublication/:pid", updatePublicationValidator, updatePublication);

router.delete("/deletePublication/:pid", deletePublicationValidator, deletePublication);

export default router;