import { Schema, model } from "mongoose"

const publicationSchema = Schema({
    titulo: {
        type: String,
        required: [true, " Titulo is requiered "]
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: "General",
        required: [true, " Categoria is requiered "]
    },
    descripcion: {
        type: String,
        required: [true, " Descripcion is requiered "]
    },
    autor:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, " Autor is requiered "]
    },
    status: {
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timestamps: true
})

publicationSchema.methods.toJSON = function () {
    const { __v, _id, ...publicacion} = this.toObject()
    publicacion.pid =publicacion._id
    return publicacion
}

export default model("Publication", publicationSchema)