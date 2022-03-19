



const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'mi perrirto sin token'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'mi perrirto ERROR token NO VALIDO'
        })
    }
}



module.exports = {
    validarJWT
}