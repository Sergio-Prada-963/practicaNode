import User from "../models/Users.js";
import bcryptjs from "bcryptjs"

const getAllUsers = async (req,res)=>{
    const {desde,hasta} = req.query;
    const query = {estado:true};
    const [total,usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(desde)).limit(Number(hasta))
    ]);
    res.json({total,usuarios});
}

const getOne = async (req,res)=>{
    const user = await User.findById({_id:req.params.id});
    res.json(user)
}

const postUser = async (req,res)=>{
    const { nombre, contrasena, email } = req.body;
    const existeNombre = await User.findOne({nombre});
    const existeEmail = await User.findOne({email});
    if(existeNombre)
        return res.json({messaje:"El nombre ya existe"});
    if(existeEmail)
        return res.json({messaje:"El nombre ya existe"});
    const newUser = new User(req.body)
    const salt = bcryptjs.genSaltSync();
    newUser.contrasena = bcryptjs.hashSync(contrasena,salt)
    await newUser.save()
    res.json(newUser);
}

const deleteUser = async (req,res)=>{
    const {id} = req.params
    const usuario = await User.findByIdAndUpdate(id,{estado:false})
    res.json({message:"borrado exitosamente...",usuario})
}

const updateUser = async (req,res)=>{
    const {id} = req.params
    const {_id, contrasena, googleSignIn, ...resto} = req.body
    if(contrasena){
        const salt = bcryptjs.genSaltSync();
        resto.contrasena = bcryptjs.hashSync(contrasena,salt);
    }
    const updateUser = await User.findByIdAndUpdate(id,resto,{new:true});
    res.json({message:"usuario Actualuzado",updateUser});
}

export {getAllUsers, getOne, postUser, deleteUser, updateUser};