import { Schema, model } from "mongoose";

const commentSchema = Schema({
    titulo: {
        type: String,
        required: [true, " Titulo is requiered "]
    },
    publication: {
        type: Schema.Types.ObjectId,
        ref: "Publication",
        required: [true, " Publication is requiered "]
    },
    descripcion: {
        type: String,
        required: [true, " Descripcion is requiered "]
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, " Autor is requiered "]
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

commentSchema.methods.toJSON = function () {
    const { __v, _id, ...comentario } = this.toObject();
    comentario.ccid = comentario._id;
    return comentario;
};

export default model("Comentario", commentSchema);