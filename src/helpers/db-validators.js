import User from "../user/user.model.js";
import Publication from "../publication/publication.model.js";
import Category from "../category/category.model.js"; 

export const emailExist = async (email = "") => {
    const existe = await User.findOne({ email });
    if (existe) {
        throw new Error(`The email ${email} is already registered`);
    }
};

export const usernameExist = async (username = "") => {
    const existe = await User.findOne({ username });
    if (existe) {
        throw new Error(`The username ${username} is already registered`);
    }
};

export const userExist = async (uid = "") => {
    const existe = await User.findById(uid);
    if (!existe) {
        throw new Error(`No existe el usuario con el ID proporcionado`);
    }
};

export const publicationExist = async (pid = "") => {
    const existe = await Publication.findById(pid);
    if (!existe) {
        throw new Error(`No existe la publicacion con el ID proporcionado`);
    }
};

export const categoryExist = async (cid = "") => {
    const existe = await Category.findById(cid);
    if (!existe) {
        throw new Error(`No existe la categoria con el ID proporcionado`);
    }
};