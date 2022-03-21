const bcrypt = require("bcryptjs/dist/bcrypt");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/usuario")


const crearUsuario = async (req, res) => {

    try {
        const { email, password } = req.body;


        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'correo registrado'
            })
        }

        const usuario = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();

        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'pailas ... !!!'
        })
    }

}

const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'login incorrecto'
            });
        }
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'login incorrecto'
            });
        }
        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'pailas ... !!!'
        })
    }
}

renewToken = async (req, res) => {
    const { uid } = req;
    const usuario = await Usuario.findById(uid);
    const token = await generarJWT(usuario.id);
    res.json({
        ok: true,
        usuario,
        token
    })
}


module.exports = {
    crearUsuario,
    login,
    renewToken
}