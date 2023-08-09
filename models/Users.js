import {Schema,model} from "mongoose";

const userSchema = Schema({
    nombre:{type:String,trim:true,required:[true]},
    contrasena:{type:String,trim:true,required:[true]},
    email:{type:String,trim:true,required:[true]},
    googleSingIn:{type:Boolean,default:true},
    estado:{type:Boolean,default:true},
    rango:{type:String,default:"USER"}
},{timestamps:true});

const User = model('usuarios2',userSchema);
export default User;