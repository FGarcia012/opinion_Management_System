import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { verifyAuthor } from "./verify-author.js";
import { publicationExist, commentExist } from "../helpers/db-validators.js";

export const addCommentValidator = [
    validateJWT,
    body("titulo").notEmpty().withMessage("El título es requerido"),
    body("descripcion").notEmpty().withMessage("La descripción es requerida"),
    body("publication").notEmpty().withMessage("La publicación es requerida"),
    body("publication").isMongoId().withMessage("No es un ID válido"),
    body("publication").custom(publicationExist),
    validarCampos,
    handleErrors
];

export const updateCommentValidator = [
    validateJWT,
    param("ccid").isMongoId().withMessage("No es un ID válido"),
    param("ccid").custom(commentExist),
    body("titulo").notEmpty().withMessage("El título es requerido"),
    body("descripcion").notEmpty().withMessage("La descripción es requerida"),
    validarCampos,
    verifyAuthor,
    handleErrors
];

export const deleteCommentValidator = [
    validateJWT,
    param("ccid").isMongoId().withMessage("No es un ID válido"),
    param("ccid").custom(commentExist),
    validarCampos,
    verifyAuthor,
    handleErrors
];