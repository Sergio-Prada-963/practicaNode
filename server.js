import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

import conectarMdb from "./config/config.js";

import routerUser from "./routes/user.routes.js"
import routerLogin from "./routes/login.routes.js"

class Server {
    constructor(){
        this.app = express();
        this.app.use(cookieParser());
        this.port = process.env.PORT;
        this.path = {
                    user: "/api/user",
                    login: "/api",
                    };
        this.middlewares();
        this.routes();
        this.conexion();
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }
    async conexion(){
        await conectarMdb();
    }
    routes(){
        this.app.use(this.path.user,routerUser);
        this.app.use(this.path.login,routerLogin);
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor onlinne </> ${this.port} ....`);
        })
    }
}
export default Server