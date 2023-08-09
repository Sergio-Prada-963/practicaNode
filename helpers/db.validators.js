import User from "../models/Users.js";

const existNombre = async (nombre='')=>{
    const existeNombre = await User.findOne({nombre})
    if(existeNombre)
        throw new Error(`El nombre ${nombre} ya se encuentra registrado`)
}
const existEmail = async (email='')=>{
    const existeEmail = await User.findOne({email})
    if(existeEmail)
        throw new Error(`El email ${email} ya se encuentra registrado`);
}
const existIdUserD = async (id)=>{
    const existId = await User.findById(id);
    if(!existId)
        throw new Error(`El id ${id} no existe`);
}
export {existNombre, existEmail, existIdUserD};

const existEmailLogin = async (email='')=>{
    const existeEmail = await User.findOne({email})
    if(!existeEmail)
        throw new Error(`El email ${email} NO se encuentra registrado`);
}
export {existEmailLogin}