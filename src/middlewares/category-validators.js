import { body } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const addCategoryValidator = [
    body("name").notEmpty().isString().withMessage("Name is requiered"),
    validarCampos,
    handleErrors
]