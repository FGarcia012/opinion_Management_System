import Publication from "../publication/publication.model.js";

export const verifyAuthor = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const userId = req.usuario._id; // Asegúrate de que el ID del usuario está en req.usuario

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

        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al verificar el autor",
            error: err.message
        });
    }
};