import User from "../user/user.model.js"

export const emailExist = async (email = "") => {
    const existe = await User.finOne({ email })
    if (existe) {
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExist = async (username = "") => {
    const existe = await User.finOne({ username })
    if (existe) {
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExist = async (uid = "") => {
    const existe = await User.findById(uid)
    if (!existe) {
        throw new Error(`No existe el usuario con el ID proporcionado`)
    }
}