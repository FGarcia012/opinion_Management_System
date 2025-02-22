import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { categoryExist } from "../helpers/db-validators.js";

export const addCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("name").notEmpty().isString().withMessage("Name is requiered"),
    validarCampos,
    handleErrors
]

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("cid").isMongoId().withMessage("No es un ID válido"),
    param("cid").custom(categoryExist),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    validarCampos,
    handleErrors
];

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("cid").isMongoId().withMessage("No es un ID válido"),
    param("cid").custom(categoryExist),
    validarCampos,
    handleErrors
];