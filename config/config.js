import mongoose from "mongoose";
const conectarMdb = async ()=>{
    try {
        const conectionDb = await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true});
        console.log(`Mongo DB online ${conectionDb.connection.host}... y en el puerto ${conectionDb.connection.port}🤠...`);
    } catch (error) {
        console.log("no funshion conexion :::(((", error.message);
        process.exit(1);
    }
}

export default conectarMdb;