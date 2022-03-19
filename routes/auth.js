/*

path: /api/login/new

*/



const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearUsuario, login } = require('./../controllers/auth')
const { validarCampos } = require('./../middlewares/validar-campos')


const router = Router();



router.post('/new', [
    check('nombre', 'nombre es obligatorio').not().notEmpty(),
    check('password', 'password es obligatorio').not().notEmpty(),
    check('email', 'email es obligatorio').isEmail(),
    validarCampos
], crearUsuario);


router.post('/', [
    check('email', 'email es obligatorio').isEmail(),
    check('password', 'password es obligatorio').not().notEmpty(),
    validarCampos
], login);

router.get('/renew', [validarJWT], renewToken)





module.exports = router;