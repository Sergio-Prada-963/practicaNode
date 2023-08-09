import {Schema,model} from "mongoose";

const rangoSchema = Schema({
    rango:{type:String}
})
const Rango = model('rangos',rangoSchema)
export default Rango