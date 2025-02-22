import { hash, verify } from "argon2";
import Category from "./category.model.js"; 
import { generateJWT } from "../helpers/generate-jwt.js";

export const addCategory = async (req, res) => {
    try {
        const data = req.body;

        const category = await Category.create(data); 

        return res.status(201).json({
            message: 'Categoria creada',
            category
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al agregar la categoria',
            error: err.message
        });
    }
};