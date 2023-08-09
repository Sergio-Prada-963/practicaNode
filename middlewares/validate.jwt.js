import {response,request} from "express"
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const validJWT = async (req=request,res=response,next)=>{
    const {token} = req.cookies;
    if(!token)
        return res.status(400).json({message:"No hay token en la peticion Jmmmm...."});
    try {
        const {uid} = jwt.verify(token,process.env.SECRET_OR_PRIVATE_KEY)
        const usuario = await User.findById(uid);
        if(!usuario)
            return res.status(400).json({message:"Token no valido --- o usuario no existe en la Bd"});
        if(!usuario.estado)
            return res.status(400).json({message:"Token no valido --- Usuario con estado false"});
        req.usuario = usuario;
        console.log(req.usuario);
        next()
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"jmmmm token no valido -_-......"});
    }
}

export default validJWT