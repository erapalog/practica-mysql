const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const servicioLogin = require('./servicios/loginService')

require('crypto').randomBytes(64).toString('hex')

const app = express();

app.use(bodyParser.json())

const TOKEN_SECRET = "bytheone$2021";



//vamos a generar nuestro token
function generarJWT(userName, password) {
    // return jwt.sign(userName, TOKEN_SECRET, { expiresIn: 60 * 60 })
    return jwt.sign(userName + password, TOKEN_SECRET);

}


function autenticarToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({"Mensaje":"Debe iniciar sesion"})

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.status(401).json({"Mensaje":"Debe iniciar sesion"})

        req.user = user

        next();
    })

}

app.post('/api/login', (req, res) => {

    let usuario = req.body.usuario;
    let clave = req.body.clave;
    let token = "";

    servicioLogin.login(usuario, clave)
        .then(data => {
            if (data[0]!=undefined && data[0]!=null) {
                token = generarJWT(usuario,clave);
                return res.status(200).json({
                    "mensaje": token
                })
            } else {
                return res.status(400).json({
                    "mensaje": "Usuario no existe"
                })
            }

        })
        .catch(error => {
            return res.status(500).json({
                "mensaje": "Ocurrio un error"
            })
        })

})


app.get('/api/consultar-usuario', autenticarToken, (req, res) => {
    res.status(200).json({"mensaje":"Servicio funcionando"});
})



app.listen(3000)