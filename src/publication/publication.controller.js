import mongoose from 'mongoose';
import Publication from "./publication.model.js";
import Category from "../category/category.model.js";

export const addPublication = async (req, res) => {
    try {
        const data = req.body;
        const user = req.usuario;

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'autor no encontrado'
            });
        }

        // Maneja las categorías
        if (data.categoria && typeof data.categoria === 'string') {
            const category = await Category.findOne({ nombre: data.categoria });
            if (category) {
                data.categoria = category._id;
            } else {
                const newCategory = new Category({ nombre: data.categoria });
                await newCategory.save();
                data.categoria = newCategory._id;
            }
        }

        const publication = new Publication({ ...data, autor: user._id });

        await publication.save();

        return res.status(200).json({
            success: true,
            publication
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al agregar la publicación',
            error: err.message
        });
    }
};

export const getPublication = async (req, res) => {
    try {
        const query = { status: true };

        const publications = await Publication.find(query)
            .populate('categoria', 'name') // Popula la categoría con su nombre
            .populate('autor', 'username'); // Popula el autor con su nombre de usuario

        return res.status(200).json({
            success: true,
            publications
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener las publicaciones',
            error: err.message
        });
    }
};

export const updatePublication = async (req, res) => {
    try {
        const { pid } = req.params;
        const data = req.body;

        const publication = await Publication.findByIdAndUpdate(pid, data, { new: true })
            .populate('categoria', 'name') // Popula la categoría con su nombre
            .populate('autor', 'username'); // Popula el autor con su nombre de usuario

        return res.status(200).json({
            success: true,
            msg: 'Publicacion actualizada',
            publication
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Error al actualizar la publicacion',
            error: err.message
        });
    }
};

export const deletePublication = async (req, res) => {
    try {
        const { pid } = req.params;

        const publication = await Publication.findByIdAndUpdate(pid, { status: false }, { new: true })
            .populate('categoria', 'name') // Popula la categoría con su nombre
            .populate('autor', 'username'); // Popula el autor con su nombre de usuario

        return res.status(200).json({
            success: true,
            message: 'Publicación eliminada',
            publication
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar la publicación',
            error: err.message
        });
    }
};