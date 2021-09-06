var express = require('express')

var service = require('../../servicios/serviceCategoria')

var router = express.Router();

router.get('/obtener-categoria', function (req, res) {
    service.selectCategorias()
        .then(result => {

            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.post('/agregar-categoria', (req, res) => {

    let descripcion = req.body.descripcion;
    let respuesta = {
        status: 200,
        mensaje: "Agregado exitosamente"
    }


    if (descripcion == null || descripcion == '' || descripcion == undefined) {
        respuesta.status = 400,
            respuesta.mensaje = "La descripcion no puede estar vacia"
        return res.status(400).json(respuesta)
    }
    service.agregarCategoria(descripcion)
        .then(data => {
            res.status(200);
        })
        .catch(err => {
            respuesta.status = 500,
                respuesta.mensaje = "Ocurrio un error" + err
            res.status(500)
        })

    res.json(respuesta)

})

module.exports = router;