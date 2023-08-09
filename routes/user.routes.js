import {check} from "express-validator";
import { Router } from "express";
import validateDocuments from "../middlewares/validateDoc.js"
import validJWT from "../middlewares/validate.jwt.js"
import rango from "../middlewares/validate.rango.js"
import {getAllUsers, getOne, postUser, deleteUser, updateUser} from "../controllers/users.controllers.js"
import {existNombre,existEmail,existIdUserD} from "../helpers/db.validators.js";

const router = Router();

router.get('/',[validJWT,validateDocuments],getAllUsers)

router.get('/:id',[validJWT,validateDocuments],getOne)

router.post('/',[
    check('nombre','nombre no valido').not().isEmpty(),
    check('nombre').custom(existNombre),
    check('email','Email invalido').not().isEmpty().isEmail(),
    check('email').custom(existEmail),
    check('contrasena','contraseña no valida').not().isEmpty(),
    check('contrasena','minimo 6 caracteres').isLength({min:6}),
validateDocuments],postUser)

router.delete('/:id',[validJWT,
    rango,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existIdUserD),
validateDocuments],deleteUser);

router.patch('/:id',[
    validJWT,
    rango,
    check('nombre','nombre no valido').not().isEmpty(),
    check('email','Email invalido').not().isEmpty().isEmail(),
    check('contrasena','contraseña no valida').not().isEmpty(),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existIdUserD),
validateDocuments],updateUser);

export default router;