const rango = (req,res,next)=>{
    if(!req.usuario)
        return res.status(400).json({message:"Se quiere validar el rango sin el token"});
    if(req.usuario.rango !== "ADMIN")
        return res.status(550).json({message:`${req.usuario.nombre} No es Admin - no tiene permiso`});
    next()
}
export default rango