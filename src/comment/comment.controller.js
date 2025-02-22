import Comment from "./comment.model.js";
import Publication from "../publication/publication.model.js";

export const addComment = async (req, res) => {
    try {
        const data = req.body;
        const user = req.usuario;

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Autor no encontrado'
            });
        }

        const publication = await Publication.findById(data.publication);
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        const comment = new Comment({ ...data, autor: user._id });

        await comment.save();

        return res.status(201).json({
            success: true,
            comment
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al agregar el comentario',
            error: err.message
        });
    }
};

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ status: true })
            .populate('publication', 'titulo')
            .populate('autor', 'username');

        return res.status(200).json({
            success: true,
            comments
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los comentarios',
            error: err.message
        });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { ccid } = req.params;
        const data = req.body;

        const comment = await Comment.findByIdAndUpdate(ccid, data, { new: true })
            .populate('publication', 'titulo')
            .populate('autor', 'username');

        return res.status(200).json({
            success: true,
            message: 'Comentario actualizado',
            comment
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar el comentario',
            error: err.message
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { ccid } = req.params;

        const comment = await Comment.findByIdAndUpdate(ccid, { status: false }, { new: true })
            .populate('publication', 'titulo')
            .populate('autor', 'username');

        return res.status(200).json({
            success: true,
            message: 'Comentario eliminado',
            comment
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el comentario',
            error: err.message
        });
    }
};