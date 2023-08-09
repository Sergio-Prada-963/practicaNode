import User from "../models/Users.js";
import { response } from "express";
import generateJWT from "../helpers/generateJWT.js"
import bcryptjs from "bcryptjs";

const login = async (req,res=response)=>{
    const {email,contrasena} = req.body;
    try {     
        const usuario = await User.findOne({email});
        if(!usuario)
            return res.status(400).json({message:"Usuario incorrecto"});
        if(!usuario.estado)
            return res.status(400).json({mesage: "Usuario desactivado"});
        const validatContrasena= bcryptjs.compareSync(contrasena, usuario.contrasena);
        if(!validatContrasena)
                return res.status(400).json({mesage: "contraseña Incorrecta"});
        const token = await generateJWT(usuario._id);
        res.cookie("token",token);
        res.json({usuario,token})
    } catch (error) {
        console.log(error);
        return res.json({message:"Auto contactarme (Servicio tecnico)"})
    }

}
export default login;