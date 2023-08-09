import { Router } from "express";
import {check} from "express-validator";
import login from "../controllers/login.controllers.js";
import validateDoc from "../middlewares/validateDoc.js";
import { existEmailLogin } from "../helpers/db.validators.js";

const router = Router();

router.post('/login',[
    check('email','No es un email valido').isEmail().not().isEmpty(),
    check('email').custom(existEmailLogin),
    check('contrasena','la contraseña no es valida').not().isEmpty(),
validateDoc],login)

export default router