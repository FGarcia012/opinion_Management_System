import { Router } from "express"
import { updatePassword, updateUser, updateProfilePicture } from "./user.controller.js"
import { updatePasswordValidator, updateUserValidator, updateProfilePictureValidator } from "../middlewares/user-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rutas de usuarios
 */

/**
 * @swagger
 * /user/updatePassword/{uid}:
 *   patch:
 *     summary: Actualizar la contraseña de un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *       500:
 *         description: Error al actualizar la contraseña
 */

/**
 * @swagger
 * /user/updateUser/{uid}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       500:
 *         description: Error al actualizar el usuario
 */

/**
 * @swagger
 * /user/updateProfilePicture/{uid}:
 *   patch:
 *     summary: Actualizar la foto de perfil de un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Foto de perfil actualizada exitosamente
 *       500:
 *         description: Error al actualizar la foto de perfil
 */

const router = Router()

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)
router.put("/updateUser/:uid", updateUserValidator, updateUser)
router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture)

export default router