var express = require('express')
var service = require('../../servicios/serviceCategoria')

var router = express.Router();

router.get('/obtener-categoria', function (req, res) {
    service.selectCategorias()
        .then(result => {
            res.set({
                "Content-type":'Text/json'
            })
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send(err)
        })
});

module.exports = router;