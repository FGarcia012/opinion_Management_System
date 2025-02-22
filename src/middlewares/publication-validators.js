import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { publicationExist } from "../helpers/db-validators.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { verifyAuthor } from "./verify-author.js";

export const addPublicationValidator = [  
    validateJWT,
    body("titulo").notEmpty().withMessage("El título es requerido"),
    body("descripcion").notEmpty().withMessage("La descripción es requerida"),
    body("autor").notEmpty().withMessage("El autor es requerido"),
    body("autor").isMongoId().withMessage("No es un ID válido"),
    validarCampos,
    handleErrors
];

export const updatePublicationValidator = [
    validateJWT,
    param("pid").isMongoId().withMessage("No es un ID válido"),
    param("pid").custom(publicationExist),
    body("titulo").notEmpty().withMessage("El título es requerido"),
    body("categoria").notEmpty().withMessage("La categoría es requerida"),
    body("categoria").isMongoId().withMessage("No es un ID válido"),
    body("descripcion").notEmpty().withMessage("La descripción es requerida"),
    body("autor").notEmpty().withMessage("La categoría es requerida"),
    body("autor").isMongoId().withMessage("No es un ID válido"),
    validarCampos,
    verifyAuthor,
    handleErrors
];

export const deletePublicationValidator = [
    validateJWT,
    param("pid").isMongoId().withMessage("No es un ID válido"),
    param("pid").custom(publicationExist),
    validarCampos,
    verifyAuthor,
    handleErrors
];