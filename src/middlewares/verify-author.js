import Publication from "../publication/publication.model.js";
import Comment from "../comment/comment.model.js";

export const verifyAuthor = async (req, res, next) => {
    try {
        const { pid, ccid } = req.params;
        const userId = req.usuario._id;

        if (pid) {
            const publication = await Publication.findById(pid);
            if (!publication) {
                return res.status(404).json({
                    success: false,
                    message: "Publicación no encontrada"
                });
            }
            if (!publication.autor) {
                return res.status(400).json({
                    success: false,
                    message: "La publicación no tiene un autor asignado"
                });
            }
            if (publication.autor.toString() !== userId.toString()) {
                return res.status(403).json({
                    success: false,
                    message: "No tienes permiso para realizar esta acción"
                });
            }
        }

        if (ccid) {
            const comment = await Comment.findById(ccid).populate('publication');
            if (!comment) {
                return res.status(404).json({
                    success: false,
                    message: "Comentario no encontrado"
                });
            }
            if (!comment.autor) {
                return res.status(400).json({
                    success: false,
                    message: "El comentario no tiene un autor asignado"
                });
            }
            if (comment.autor.toString() !== userId.toString()) {
                return res.status(403).json({
                    success: false,
                    message: "No tienes permiso para realizar esta acción"
                });
            }
            if (!comment.publication) {
                return res.status(400).json({
                    success: false,
                    message: "El comentario no tiene una publicación asignada"
                });
            }
        }

        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al verificar el autor",
            error: err.message
        });
    }
};