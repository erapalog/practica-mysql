var express = require('express')
var service = require('../../servicios/serviceComentario')

var router = express.Router();

router.get('/obtener-comentarios', function (req, res) {
    service.selectComentarios()
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send(err)
        })
});

module.exports = router;