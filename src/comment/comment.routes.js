import { Router } from "express";
import { addComment, getComments, updateComment, deleteComment } from "./comment.controller.js";
import { addCommentValidator, updateCommentValidator, deleteCommentValidator } from "../middlewares/comment-validators.js";

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Rutas de comentarios
 */

/**
 * @swagger
 * /comment/addComment:
 *   post:
 *     summary: Agregar un nuevo comentario
 *     tags: [Comments]
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
 *               publication:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comentario agregado exitosamente
 *       500:
 *         description: Error al agregar el comentario
 */

/**
 * @swagger
 * /comment/getComments:
 *   get:
 *     summary: Obtener todos los comentarios
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *       500:
 *         description: Error al obtener los comentarios
 */

/**
 * @swagger
 * /comment/updateComment/{ccid}:
 *   put:
 *     summary: Actualizar un comentario
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: ccid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del comentario
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
 *     responses:
 *       200:
 *         description: Comentario actualizado exitosamente
 *       500:
 *         description: Error al actualizar el comentario
 */

/**
 * @swagger
 * /comment/deleteComment/{ccid}:
 *   delete:
 *     summary: Eliminar un comentario
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: ccid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente
 *       500:
 *         description: Error al eliminar el comentario
 */

const router = Router();

router.post("/addComment", addCommentValidator, addComment);

router.get("/getComments", getComments);

router.put("/updateComment/:ccid", updateCommentValidator, updateComment);

router.delete("/deleteComment/:ccid", deleteCommentValidator, deleteComment);

export default router;