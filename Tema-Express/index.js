const express = require('express')
const operaciones = require('./modulos/operaciones')
const mysql = require('mysql')
const configuraciones = require('./configuraciones.json')

const cnx = mysql.createConnection({
    host: configuraciones.BD.host,
    user: configuraciones.BD.user,
    password: configuraciones.BD.password,
    database: configuraciones.BD.database
})

const app = express();

app.get('/ping', (req, res) => {
    res.send('pong')
});

app.get('/saludo/:nombre/:apellido', (req, res) => {
    res.send("Hola Bienvenido => " + req.params.nombre + " " + req.params.apellido)
});


app.get('/saludar-persona/:nombre', (req, res) => {
    res.send(retornatSaludo(req.params.nombre))
});

app.get('/operaciones/:a/:b/:tipoOperacion', (req, res) => {

    let a = parseInt(req.params.a);
    let b = parseInt(req.params.b);
    let c = parseInt(req.params.tipoOperacion);

    let resultado = (c == 1) ? operaciones.suma(a, b) : operaciones.resta(a, b)

    res.send("resultado es: " + resultado)
});


app.get('/consultar-productos', (req, res) => {

    cnx.connect(function (error) {
        if (error) {
            console.log("Error al conectar")
        } else {
            cnx.query("Select * from tbl_productos", function (error, data) {
                if (error) {
                    res.send("Ocurrio un error en la consulta" + error)
                } else {
                    res.set({
                        "Content-type": 'Text/json'
                    })
                    res.send(JSON.stringify(data))
                }
            })
        }
    })

});

function retornatSaludo(nombre) {
    return "Bienvenido => " + nombre;
}


app.listen(3000);