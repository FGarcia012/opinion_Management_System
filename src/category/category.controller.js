import { hash, verify } from "argon2";
import Category from "./category.model.js"; 
import { generateJWT } from "../helpers/generate-jwt.js";
import Publication from "../publication/publication.model.js";

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

export const updateCategory = async (req, res) => {
    try {
        const { cid } = req.params
        const data = req.body

        const category = await Category.findByIdAndUpdate(cid, data, { new: true })

        return res.status(200).json({
            message: 'Categoria actualizada',
            category
        })
    }catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar la categoria',
            error: err.message
        })
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { cid } = req.params;

        // Encuentra la categoría "General"
        const generalCategory = await Category.findOne({ name: "General" });
        if (!generalCategory) {
            return res.status(500).json({
                success: false,
                message: 'La categoría "General" no existe'
            });
        }

        // Actualiza las publicaciones que referencian a la categoría eliminada
        await Publication.updateMany({ categoria: cid }, { categoria: generalCategory._id });

        // Elimina la categoría
        await Category.findByIdAndDelete(cid);

        return res.status(200).json({
            message: 'Categoria eliminada y publicaciones actualizadas a "General"'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar la categoria',
            error: err.message
        });
    }
};