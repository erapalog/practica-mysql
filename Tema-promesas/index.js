const express = require('express')
const bodyParser = require('body-parser')

const servicios = require('./servicios/ServiceCategoriaLibro')
const mensajes = require('./utilidades/Mensajes.json')
const validador = require('./servicios/Validate')
const app = express();

app.use(bodyParser.json({
    type: 'application/json'
}))

app.get('/consulta-categorias', (req, res) => {
    servicios.seleccionarCategorias()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(mensajes.mensajeError + err)
        })
})


app.get('/consulta-categoria-id/:idcategoria', (req, res) => {
    let id = req.params.idcategoria;

    servicios.seleccionarPorCategoria(id)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send(mensajes.mensajeError + err)
        })
})

app.post('/agregar-categoria', (req, res) => {

    let descripcion = req.body.descripcion;
    let estado = req.body.estado;

    let respuesta = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(descripcion) || !validador.validarDatos(estado)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        res.set({
            "Content-type": "Text/json"
        })
        return res.status(400).send(JSON.stringify(respuesta));

    }

    servicios.agregarCategoria(descripcion, estado)
        .then(data => {
            respuesta.mensaje = mensajes.mensajeOK
            res.set({
                "Content-type": "Text/json"
            })
            return res.status(200).send(JSON.stringify(respuesta));
        })
        .catch(data => {
            respuesta.status = 500;
            res.set({
                "Content-type": "Text/json"
            })
            respuesta.mensaje = mensajes.mensajeError
            return res.status(200).send(JSON.stringify(respuesta));
        });
})

app.put('/actualizar-categoria/:idcategoria', (req, res) => {

    //recibiendo por body
    let descripcion = req.body.descripcion;
    let estado = req.body.estado;

    //recibiendo por la url
    let idCategoria = req.params.idcategoria

    let respuesta = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(descripcion) || !validador.validarDatos(estado) || !validador.validarDatos(idCategoria)) {
        respuesta.status = 400;
        respuesta.mensaje = mensajes.MensajeValidador

        res.set({
            "Content-type": "Text/json"
        })
        return res.status(400).send(JSON.stringify(respuesta));

    }

    servicios.actualizarCategoria(descripcion, estado, idCategoria)
        .then(data => {
            respuesta.mensaje = mensajes.mensajeOK
            res.set({
                "Content-type": "Text/json"
            })
            return res.status(200).send(JSON.stringify(respuesta));
        })
        .catch(data => {
            respuesta.status = 500;
            res.set({
                "Content-type": "Text/json"
            })
            respuesta.mensaje = mensajes.mensajeError
            return res.status(200).send(JSON.stringify(respuesta));
        });
})
app.listen(3000);