const express = require('express')
const jwt = require('jsonwebtoken')

require('crypto').randomBytes(64).toString('hex')

const app = express();

const TOKEN_SECRET = "bytheone$2021";

const usuarios = [{
        id: 1,
        nombre: 'Erick'
    },
    {
        id: 2,
        nombre: "Pedro"
    }
]

//vamos a generar nuestro token
function generarJWT(userName) {
    // return jwt.sign(userName, TOKEN_SECRET, { expiresIn: 60 * 60 })
    return jwt.sign(userName, TOKEN_SECRET);

}


function autenticarToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(401)

        req.user = user

        next();
    })

}

app.get('/api/login/:usuario', (req, res) => {

    let usuario = req.params.usuario;
    let token = "";

    let existeUsuario = validarUsuario(usuario)

    if (existeUsuario) {
        token = generarJWT(usuario);
        return res.status(200).json({
            "mensaje": token
        })
    } else {

        return res.status(400).json({
            "mensaje": "Usuario no existe"
        })
    }

})


app.get('/api/consultar-usuario', autenticarToken, (req, res) => {

    res.status(200).json(usuarios);
})


function validarUsuario(userName) {



    let existe = false;
    for (let i of usuarios) {
        if (i.nombre == userName) {
            existe = true;
        }

    }
    return existe;
}

app.listen(3000)